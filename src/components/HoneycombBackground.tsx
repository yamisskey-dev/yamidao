"use client";

import { useEffect, useRef } from "react";

interface Cell {
  cx: number;
  cy: number;
  glowPhase: number;
  glowSpeed: number;
  hoverIntensity: number;
}

interface Vertex {
  x: number;
  y: number;
}

interface ColorCache {
  primary: string;
  secondary: string;
}

interface Props {
  className?: string;
}

const HEX_SIZE = 60;
const HEX_LINE_WIDTH = 1;
const BASE_LINE_ALPHA = 0.12;
const GLOW_AMPLITUDE = 0.06;
const HOVER_LERP = 0.12;
const FADE_INNER_FACTOR = 2;
const FADE_OUTER_FACTOR = 5;
const VERTEX_DOT_RADIUS = 5.5;
const VERTEX_DOT_ALPHA = 0.85;
const VERTEX_HIGHLIGHT_RADIUS = 2;
const VERTEX_HIGHLIGHT_ALPHA = 0.3;
const VERTEX_SPRITE_HALF = 7;

function readColors(): ColorCache {
  const style = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => {
    const v = style.getPropertyValue(name).trim();
    return v || fallback;
  };
  return {
    primary: get("--color-primary", "#966BFF"),
    secondary: get("--color-secondary", "#DB9DFF"),
  };
}

function parseColor(input: string): { r: number; g: number; b: number } {
  const trimmed = input.trim();
  if (trimmed.startsWith("rgb")) {
    const m = trimmed.match(/[\d.]+/g);
    if (m && m.length >= 3) return { r: +m[0], g: +m[1], b: +m[2] };
  }
  const hex = trimmed.replace("#", "");
  const expanded =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  const num = parseInt(expanded.slice(0, 6), 16);
  if (Number.isNaN(num)) return { r: 150, g: 107, b: 255 };
  return { r: (num >> 16) & 0xff, g: (num >> 8) & 0xff, b: num & 0xff };
}

function rgba(color: string, alpha: number): string {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function tracePointyTopHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 6;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function HoneycombBackground({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cells: Cell[] = [];
    let vertices: Vertex[] = [];
    let dotSprite: HTMLCanvasElement | null = null;
    let colors = readColors();
    let rafId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let widthCss = 0;
    let heightCss = 0;
    let hoveredCellIdx: number | null = null;
    let currentHexSize = HEX_SIZE;
    let fadeCenterX = 0;
    let fadeCenterY = 0;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = reduceMotionQuery.matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      widthCss = Math.max(1, rect.width);
      heightCss = Math.max(1, rect.height);
      canvas.width = Math.floor(widthCss * dpr);
      canvas.height = Math.floor(heightCss * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildDotSprite = () => {
      const dpr = window.devicePixelRatio || 1;
      const halfSize = VERTEX_SPRITE_HALF;
      const sizePx = halfSize * 2;
      const sprite = document.createElement("canvas");
      sprite.width = Math.max(1, Math.floor(sizePx * dpr));
      sprite.height = Math.max(1, Math.floor(sizePx * dpr));
      const sctx = sprite.getContext("2d");
      if (!sctx) {
        dotSprite = null;
        return;
      }
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.fillStyle = rgba(colors.primary, VERTEX_DOT_ALPHA);
      sctx.beginPath();
      sctx.arc(halfSize, halfSize, VERTEX_DOT_RADIUS, 0, Math.PI * 2);
      sctx.fill();
      sctx.fillStyle = `rgba(255, 255, 255, ${VERTEX_HIGHLIGHT_ALPHA})`;
      sctx.beginPath();
      sctx.arc(halfSize, halfSize, VERTEX_HIGHLIGHT_RADIUS, 0, Math.PI * 2);
      sctx.fill();
      dotSprite = sprite;
    };

    const initGrid = () => {
      cells = [];

      let hexSize = HEX_SIZE;
      let offsetX = 0;
      let offsetY = 0;
      fadeCenterX = widthCss / 2;
      fadeCenterY = heightCss / 2;
      const logoEl = document.getElementById("hero-logo");
      if (logoEl) {
        const logoRect = logoEl.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        if (logoRect.width > 0 && logoRect.height > 0) {
          // ロゴ SVG: viewBox 320 内で中心 (160,160) から半径 144 の hexagon にノード配置
          // → ロゴ width × 144/320 を HEX_SIZE にすればロゴ 6 ノード = セル 6 頂点
          hexSize = (logoRect.width * 144) / 320;
          const logoCx = logoRect.left + logoRect.width / 2 - canvasRect.left;
          const logoCy = logoRect.top + logoRect.height / 2 - canvasRect.top;
          fadeCenterX = logoCx;
          fadeCenterY = logoCy;
          const horizSp = Math.sqrt(3) * hexSize;
          const vertSp = 1.5 * hexSize;
          const rStar = Math.round(logoCy / vertSp);
          const shift = ((rStar % 2) + 2) % 2 === 0 ? 0 : 0.5;
          const qStar = Math.round(logoCx / horizSp - shift);
          offsetX = logoCx - horizSp * (qStar + shift);
          offsetY = logoCy - vertSp * rStar;
        }
      }
      currentHexSize = hexSize;

      const horizSpacing = Math.sqrt(3) * hexSize;
      const vertSpacing = 1.5 * hexSize;
      const cols = Math.ceil(widthCss / horizSpacing) + 3;
      const rows = Math.ceil(heightCss / vertSpacing) + 3;
      for (let r = -2; r < rows; r++) {
        for (let q = -2; q < cols; q++) {
          const cx = horizSpacing * (q + (r % 2 === 0 ? 0 : 0.5)) + offsetX;
          const cy = vertSpacing * r + offsetY;
          cells.push({
            cx,
            cy,
            glowPhase: Math.random() * Math.PI * 2,
            glowSpeed: 0.0008 + Math.random() * 0.0008,
            hoverIntensity: 0,
          });
        }
      }
      const vertexMap = new Map<string, Vertex>();
      for (const cell of cells) {
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i + Math.PI / 6;
          const vx = cell.cx + hexSize * Math.cos(angle);
          const vy = cell.cy + hexSize * Math.sin(angle);
          const key = `${Math.round(vx)}_${Math.round(vy)}`;
          if (!vertexMap.has(key)) vertexMap.set(key, { x: vx, y: vy });
        }
      }
      vertices = Array.from(vertexMap.values());
      buildDotSprite();
      hoveredCellIdx = null;
    };

    const findCellAt = (x: number, y: number): number | null => {
      let best = -1;
      let bestDist = currentHexSize * currentHexSize;
      for (let i = 0; i < cells.length; i++) {
        const dx = cells[i].cx - x;
        const dy = cells[i].cy - y;
        const d = dx * dx + dy * dy;
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best >= 0 ? best : null;
    };

    const radialFade = (x: number, y: number): number => {
      const dx = x - fadeCenterX;
      const dy = y - fadeCenterY;
      const d = Math.sqrt(dx * dx + dy * dy);
      const inner = currentHexSize * FADE_INNER_FACTOR;
      const outer = currentHexSize * FADE_OUTER_FACTOR;
      if (d <= inner) return 1;
      if (d >= outer) return 0;
      const t = (d - inner) / (outer - inner);
      return 1 - t * t * (3 - 2 * t);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, widthCss, heightCss);

      ctx.lineWidth = HEX_LINE_WIDTH;

      for (const cell of cells) {
        const fadeMul = radialFade(cell.cx, cell.cy);
        if (fadeMul <= 0.01) continue;

        const phase = reduceMotion
          ? 0
          : Math.sin(cell.glowPhase + now * cell.glowSpeed);
        const breathAlpha = BASE_LINE_ALPHA + GLOW_AMPLITUDE * (phase + 1) * 0.5;

        const hover = cell.hoverIntensity;
        if (hover > 0.01) {
          const haloR = currentHexSize * (1.2 + 0.4 * hover);
          const halo = ctx.createRadialGradient(
            cell.cx,
            cell.cy,
            0,
            cell.cx,
            cell.cy,
            haloR
          );
          halo.addColorStop(0, rgba(colors.primary, 0.22 * hover * fadeMul));
          halo.addColorStop(1, rgba(colors.primary, 0));
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(cell.cx, cell.cy, haloR, 0, Math.PI * 2);
          ctx.fill();

          tracePointyTopHex(ctx, cell.cx, cell.cy, currentHexSize);
          ctx.fillStyle = rgba(colors.primary, 0.08 * hover * fadeMul);
          ctx.fill();
          ctx.strokeStyle = rgba(colors.primary, (0.55 * hover + breathAlpha) * fadeMul);
          ctx.stroke();
        } else {
          tracePointyTopHex(ctx, cell.cx, cell.cy, currentHexSize);
          ctx.strokeStyle = rgba(colors.secondary, breathAlpha * fadeMul);
          ctx.stroke();
        }
      }

      if (dotSprite) {
        const halfSize = VERTEX_SPRITE_HALF;
        const sizePx = halfSize * 2;
        for (const v of vertices) {
          const fadeMul = radialFade(v.x, v.y);
          if (fadeMul <= 0.01) continue;
          ctx.globalAlpha = fadeMul;
          ctx.drawImage(dotSprite, v.x - halfSize, v.y - halfSize, sizePx, sizePx);
        }
        ctx.globalAlpha = 1;
      }
    };

    const tick = (now: number) => {
      if (!isVisible || !isPageVisible) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      for (let i = 0; i < cells.length; i++) {
        const target = i === hoveredCellIdx ? 1 : 0;
        cells[i].hoverIntensity += (target - cells[i].hoverIntensity) * HOVER_LERP;
      }
      draw(now);
      rafId = requestAnimationFrame(tick);
    };

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      buildDotSprite();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) isVisible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const onPageVisibility = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onPageVisibility);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        hoveredCellIdx = null;
        return;
      }
      hoveredCellIdx = findCellAt(x, y);
    };
    const onMouseLeave = () => {
      hoveredCellIdx = null;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initGrid();
        if (reduceMotion) draw(performance.now());
      }, 200);
    };
    window.addEventListener("resize", onResize);

    const onReduceMotionChange = (ev: MediaQueryListEvent) => {
      reduceMotion = ev.matches;
      cancelAnimationFrame(rafId);
      if (reduceMotion) {
        draw(performance.now());
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };
    reduceMotionQuery.addEventListener("change", onReduceMotionChange);

    // ロゴの fade-in-up アニメーション完了 / 画像 load 完了で再 init して位置を再整合
    const reinit = () => {
      initGrid();
      if (reduceMotion) draw(performance.now());
    };
    const onLogoAnimationEnd = (e: Event) => {
      if ((e as AnimationEvent).animationName === "fade-in-up") reinit();
    };
    const logoEl = document.getElementById("hero-logo");
    let logoLoadHandler: (() => void) | null = null;
    if (logoEl) {
      // animationend は親 div からバブルアップする
      logoEl.addEventListener("animationend", onLogoAnimationEnd);
      if (logoEl instanceof HTMLImageElement && !logoEl.complete) {
        logoLoadHandler = reinit;
        logoEl.addEventListener("load", logoLoadHandler);
      }
    }

    resize();
    initGrid();
    if (reduceMotion) {
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onPageVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      reduceMotionQuery.removeEventListener("change", onReduceMotionChange);
      if (logoEl) {
        logoEl.removeEventListener("animationend", onLogoAnimationEnd);
        if (logoLoadHandler) logoEl.removeEventListener("load", logoLoadHandler);
      }
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full pointer-events-none ${className ?? ""}`}
    />
  );
}
