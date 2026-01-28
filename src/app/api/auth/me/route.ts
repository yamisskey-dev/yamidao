import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAppContext } from "@/lib/env";
import { users, profiles } from "@/db/schema";
import { getTokenFromCookie, verifyJWT } from "@/lib/auth/jwt";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { db, jwtSecret } = getAppContext();

    // Get token from cookie
    const token = getTokenFromCookie(req.headers.get("cookie"));
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify JWT
    const payload = await verifyJWT(token, jwtSecret);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get profile
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    });

    return NextResponse.json({
      id: user.id,
      handle: user.handle,
      account: user.account,
      hostName: user.hostName,
      displayName: profile?.displayName,
      avatarUrl: profile?.avatarUrl,
      ethAddress: user.ethAddress,
    });
  } catch (error) {
    // Log only error type to prevent user data leakage
    console.error(
      "Get user error:",
      error instanceof Error ? error.constructor.name : "unknown"
    );
    return NextResponse.json(
      { error: "Failed to get user info" },
      { status: 500 }
    );
  }
}
