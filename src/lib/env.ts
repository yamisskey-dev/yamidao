import { getRequestContext } from "@cloudflare/next-on-pages";
import type { CloudflareEnv } from "@/env.d";
import { createDb, type Database } from "@/db";

export interface AppContext {
  db: Database;
  jwtSecret: string;
  webUrl: string;
  isProduction: boolean;
}

// Get environment and create context for API routes
export function getAppContext(): AppContext {
  // In Cloudflare Pages, use getRequestContext
  // In development, fall back to process.env
  let env: Partial<CloudflareEnv>;
  let db: Database;

  try {
    const ctx = getRequestContext<CloudflareEnv>();
    env = ctx.env;
    if (!env.DB) {
      throw new Error("D1 database binding not found");
    }
    db = createDb(env.DB);
  } catch {
    // Development fallback - D1 requires wrangler pages dev
    throw new Error(
      "D1 database not available. Use 'pnpm preview' to run with D1 bindings (builds first, then runs wrangler pages dev)."
    );
  }

  const jwtSecret = env.JWT_SECRET || process.env.JWT_SECRET;
  const webUrl = env.WEB_URL || process.env.WEB_URL || "http://localhost:3000";

  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is required");
  }

  return {
    db,
    jwtSecret,
    webUrl,
    isProduction: process.env.NODE_ENV === "production",
  };
}
