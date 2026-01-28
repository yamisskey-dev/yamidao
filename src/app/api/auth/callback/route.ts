import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAppContext } from "@/lib/env";
import { servers } from "@/db/schema";
import { getAuthSession, deleteAuthSession } from "@/lib/auth/session";
import { hashToken } from "@/lib/auth/crypto";
import { createJWT, createTokenCookie } from "@/lib/auth/jwt";
import { MisskeyApiClient } from "@/lib/misskey/api";
import { UserService } from "@/lib/services/user";

export const runtime = "edge";

interface CallbackRequest {
  token: string;
  host: string;
}

export async function POST(req: NextRequest) {
  let data: CallbackRequest;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!data.token || !data.host) {
    return NextResponse.json(
      { error: "Token and host are required" },
      { status: 400 }
    );
  }

  const { token, host } = data;

  try {
    const { db, jwtSecret, isProduction } = getAppContext();

    // Verify session exists
    const sessionData = await getAuthSession(db, token);
    if (!sessionData) {
      return NextResponse.json(
        { error: "Session expired or invalid" },
        { status: 401 }
      );
    }

    // Get server info
    const server = await db.query.servers.findFirst({
      where: eq(servers.instances, host),
    });

    if (!server || !server.appSecret) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    // Get user key from Misskey
    const client = new MisskeyApiClient(host);
    let userKeyResult;

    try {
      userKeyResult = await client.getUserKey(server.appSecret, token);
    } catch (error) {
      console.error("Failed to get userkey:", error);
      return NextResponse.json(
        { error: "Failed to authenticate with Misskey" },
        { status: 401 }
      );
    }

    const { accessToken, user: misskeyUser } = userKeyResult;

    // Create access token hash using Web Crypto API
    const hashedToken = await hashToken(accessToken, server.appSecret);

    // Create or update user
    const userService = new UserService(db);
    const userResult = await userService.upsertFromMisskey({
      hostName: host,
      hashedToken,
      serverId: server.id,
      misskeyUser,
    });

    // Clean up session
    await deleteAuthSession(db, token);

    // Create JWT
    const jwt = await createJWT(
      {
        sub: userResult.handle,
        userId: userResult.id,
        hostName: host,
      },
      jwtSecret
    );

    // Return success with Set-Cookie header
    const response = NextResponse.json({
      success: true,
      handle: userResult.handle,
      displayName: userResult.displayName,
      avatarUrl: userResult.avatarUrl,
    });

    response.headers.set("Set-Cookie", createTokenCookie(jwt, isProduction));

    return response;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
