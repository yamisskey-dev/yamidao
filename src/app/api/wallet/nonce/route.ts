import { NextRequest, NextResponse } from "next/server";
import { eq, and, gte, count } from "drizzle-orm";
import { getAppContext } from "@/lib/env";
import { walletNonces } from "@/db/schema";
import { getTokenFromCookie, verifyJWT } from "@/lib/auth/jwt";

// Generate random nonce (Edge compatible)
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const runtime = "edge";

const NONCE_EXPIRY_SECONDS = 300; // 5 minutes
const RATE_LIMIT_WINDOW_SECONDS = 60; // 1 minute window
const MAX_NONCES_PER_WINDOW = 5; // Max 5 nonce requests per minute per user

export async function POST(req: NextRequest) {
  try {
    const { db, jwtSecret } = getAppContext();

    // Verify user is authenticated
    const token = getTokenFromCookie(req.headers.get("cookie"));
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyJWT(token, jwtSecret);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Rate limiting: Check recent nonce count for this user
    const windowStart = new Date(
      Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000
    );
    const recentNonces = await db
      .select({ count: count() })
      .from(walletNonces)
      .where(
        and(
          eq(walletNonces.userId, payload.userId),
          gte(walletNonces.createdAt, windowStart)
        )
      );

    if (recentNonces[0]?.count >= MAX_NONCES_PER_WINDOW) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Generate nonce
    const nonce = generateNonce();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + NONCE_EXPIRY_SECONDS * 1000);

    // Store nonce
    await db.insert(walletNonces).values({
      id: nonce,
      userId: payload.userId,
      expiresAt,
      createdAt: now,
    });

    return NextResponse.json({ nonce });
  } catch (error) {
    // Log only error type
    console.error(
      "Nonce generation error:",
      error instanceof Error ? error.constructor.name : "unknown"
    );
    return NextResponse.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    );
  }
}
