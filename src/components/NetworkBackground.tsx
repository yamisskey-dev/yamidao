"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  clusterId: number;
  connectionCount: number;
  isolationFrames: number;
}

interface Edge {
  a: number;
  b: number;
  distance: number;
}

interface ColorCache {
  primary: string;
  secondary: string;
}

interface Props {
  className?: string;
}

const CLUSTER_COUNT = 3;
const MAX_CONNECTIONS = 3;
const CONN_DIST_SAME_CLUSTER = 200;
const CONN_DIST_CROSS_CLUSTER = 130;
const MIN_NODE_DISTANCE = 110;
const EDGE_REFRESH_INTERVAL = 5;

function poissonDiskSample(
  count: number,
  width: number,
  height: number,
  minDist: number
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const minDistSq = minDist * minDist;
  let attempts = 0;
  const maxAttempts = count * 30;
  while (points.length < count && attempts < maxAttempts) {
    const candidate = {
      x: Math.random() * width,
      y: Math.random() * height,
    };
    let ok = true;
    for (const p of points) {
      const dx = p.x - candidate.x;
      const dy = p.y - candidate.y;
      if (dx * dx + dy * dy < minDistSq) {
        ok = false;
        break;
      }
    }
    if (ok) points.push(candidate);
    attempts++;
  }
  while (points.length < count) {
    points.push({ x: Math.random() * width, y: Math.random() * height });
  }
  return points;
}

function assignClusters(nodes: Node[], k: number) {
  if (nodes.length === 0) return;
  const seedSet = new Set<number>();
  while (seedSet.size < k && seedSet.size < nodes.length) {
    seedSet.add(Math.floor(Math.random() * nodes.length));
  }
  const centers = Array.from(seedSet).map((i) => ({
    x: nodes[i].x,
    y: nodes[i].y,
  }));
  for (let iter = 0; iter < 4; iter++) {
    for (const node of nodes) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < centers.length; c++) {
        const dx = centers[c].x - node.x;
        const dy = centers[c].y - node.y;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      node.clusterId = best;
    }
    const sums = centers.map(() => ({ x: 0, y: 0, n: 0 }));
    for (const node of nodes) {
      const s = sums[node.clusterId];
      s.x += node.x;
      s.y += node.y;
      s.n += 1;
    }
    for (let c = 0; c < centers.length; c++) {
      if (sums[c].n > 0) {
        centers[c].x = sums[c].x / sums[c].n;
        centers[c].y = sums[c].y / sums[c].n;
      }
    }
  }
}

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
    if (m && m.length >= 3) {
      return { r: +m[0], g: +m[1], b: +m[2] };
    }
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

export function NetworkBackground({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let colors = readColors();
    let rafId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let widthCss = 0;
    let heightCss = 0;
    let frameCount = 0;

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

    const initGraph = () => {
      const count = Math.max(7, Math.min(20, Math.floor(widthCss / 90)));
      const positions = poissonDiskSample(count, widthCss, heightCss, MIN_NODE_DISTANCE);
      nodes = positions.map((p) => ({
        x: p.x,
        y: p.y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 2.5 + Math.random() * 2.5,
        clusterId: 0,
        connectionCount: 0,
        isolationFrames: 0,
      }));
      assignClusters(nodes, Math.min(CLUSTER_COUNT, nodes.length));
      computeEdges();
    };

    const computeEdges = () => {
      edges = [];
      const counts = new Array(nodes.length).fill(0);
      const candidates: Edge[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const sameCluster = nodes[i].clusterId === nodes[j].clusterId;
          const limit = sameCluster ? CONN_DIST_SAME_CLUSTER : CONN_DIST_CROSS_CLUSTER;
          if (d < limit) candidates.push({ a: i, b: j, distance: d });
        }
      }
      candidates.sort((x, y) => x.distance - y.distance);
      for (const cand of candidates) {
        if (counts[cand.a] >= MAX_CONNECTIONS || counts[cand.b] >= MAX_CONNECTIONS) continue;
        edges.push(cand);
        counts[cand.a] += 1;
        counts[cand.b] += 1;
      }
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connectionCount = counts[i];
      }
    };

    const updateNodes = () => {
      const margin = 40;
      for (const n of nodes) {
        const isolated = n.connectionCount === 0;
        if (isolated) {
          n.isolationFrames = Math.min(n.isolationFrames + 1, 600);
        } else {
          n.isolationFrames = 0;
        }
        const driftMul = isolated ? 1 + (n.isolationFrames / 600) * 1.5 : 1;
        n.x += n.vx * driftMul;
        n.y += n.vy * driftMul;
        n.vx += (Math.random() - 0.5) * 0.005;
        n.vy += (Math.random() - 0.5) * 0.005;
        const maxV = isolated ? 0.45 : 0.25;
        if (n.vx > maxV) n.vx = maxV;
        else if (n.vx < -maxV) n.vx = -maxV;
        if (n.vy > maxV) n.vy = maxV;
        else if (n.vy < -maxV) n.vy = -maxV;
        if (n.x < -margin) n.x = widthCss + margin;
        else if (n.x > widthCss + margin) n.x = -margin;
        if (n.y < -margin) n.y = heightCss + margin;
        else if (n.y > heightCss + margin) n.y = -margin;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, widthCss, heightCss);

      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const closeness = 1 - edge.distance / CONN_DIST_SAME_CLUSTER;
        const opacity = Math.max(0.05, 0.1 + closeness * 0.2);
        ctx.strokeStyle = rgba(colors.secondary, opacity);
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const stability = Math.min(n.connectionCount / MAX_CONNECTIONS, 1);
        const alpha = 0.25 + stability * 0.55;
        const haloR = n.radius * (3 + stability * 2);
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        halo.addColorStop(0, rgba(colors.primary, alpha * 0.5));
        halo.addColorStop(1, rgba(colors.primary, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(colors.primary, alpha);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (!isVisible || !isPageVisible) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      updateNodes();
      if (frameCount % EDGE_REFRESH_INTERVAL === 0) computeEdges();
      frameCount += 1;
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
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

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initGraph();
        if (reduceMotion) draw();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    const onReduceMotionChange = (ev: MediaQueryListEvent) => {
      reduceMotion = ev.matches;
      cancelAnimationFrame(rafId);
      if (reduceMotion) {
        draw();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };
    reduceMotionQuery.addEventListener("change", onReduceMotionChange);

    resize();
    initGraph();
    if (reduceMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onPageVisibility);
      window.removeEventListener("resize", onResize);
      reduceMotionQuery.removeEventListener("change", onReduceMotionChange);
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
