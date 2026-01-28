/// <reference types="@cloudflare/workers-types" />

// Cloudflare environment types
export interface CloudflareEnv {
  DB: D1Database;
  JWT_SECRET: string;
  WEB_URL: string;
  [key: string]: unknown;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET?: string;
      WEB_URL?: string;
      NODE_ENV?: string;
    }
  }
}
