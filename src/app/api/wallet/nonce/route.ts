import { NextRequest, NextResponse } from "next/server";
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
    console.error("Nonce generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
