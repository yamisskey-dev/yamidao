import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAppContext } from "@/lib/env";
import { users } from "@/db/schema";
import { getTokenFromCookie, verifyJWT } from "@/lib/auth/jwt";

export const runtime = "edge";

export async function DELETE(req: NextRequest) {
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

    // Clear ETH address
    await db
      .update(users)
      .set({ ethAddress: null, updatedAt: new Date() })
      .where(eq(users.id, payload.userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log only error type
    console.error(
      "Wallet unlink error:",
      error instanceof Error ? error.constructor.name : "unknown"
    );
    return NextResponse.json(
      { error: "Failed to unlink wallet" },
      { status: 500 }
    );
  }
}
