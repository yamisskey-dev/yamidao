import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAppContext } from "@/lib/env";
import { servers } from "@/db/schema";
import { createAuthSession } from "@/lib/auth/session";
import { generateId } from "@/lib/auth/crypto";
import { detectInstance, isMisskeyLike, isAllowedHost } from "@/lib/misskey/detect-instance";
import { MisskeyApiClient, MisskeyError } from "@/lib/misskey/api";

export const runtime = "edge";

interface LoginRequest {
  host: string;
}

export async function POST(req: NextRequest) {
  let data: LoginRequest;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!data.host || typeof data.host !== "string") {
    return NextResponse.json({ error: "Host is required" }, { status: 400 });
  }

  const misskeyHost = data.host.toLowerCase().trim();

  // Check if host is in the allowed list
  if (!isAllowedHost(misskeyHost)) {
    return NextResponse.json(
      {
        error:
          "このサーバーからのログインは許可されていません。yami.ski または beta.yami.ski のアカウントをご利用ください。",
      },
      { status: 403 }
    );
  }

  try {
    const { db, webUrl } = getAppContext();

    // Check instance type
    const instanceType = await detectInstance(misskeyHost);

    if (!instanceType || !isMisskeyLike(instanceType)) {
      return NextResponse.json(
        { error: "This is not a supported Misskey instance" },
        { status: 400 }
      );
    }

    // Check if we have existing app credentials for this instance
    let server = await db.query.servers.findFirst({
      where: eq(servers.instances, misskeyHost),
    });

    const client = new MisskeyApiClient(misskeyHost);

    // If no app exists or appSecret is invalid, create new app
    if (!server || !server.appSecret) {
      try {
        const appData = await client.createApp({
          name: "YAMI DAO",
          description: "YAMI DAO - Misskey認証によるメンバー確認",
          permission: ["read:account"],
          callbackUrl: `${webUrl}/misskey-callback`,
        });

        const appSecret = appData.secret;
        const now = new Date();

        if (server) {
          // Update existing server with new appSecret
          await db
            .update(servers)
            .set({
              appSecret,
              instanceType,
              updatedAt: now,
            })
            .where(eq(servers.id, server.id));

          server = { ...server, appSecret, instanceType };
        } else {
          // Create new server record
          const newServer = {
            id: generateId(),
            instances: misskeyHost,
            instanceType,
            appSecret,
            createdAt: now,
            updatedAt: now,
          };

          await db.insert(servers).values(newServer);
          server = newServer;
        }

        // App created successfully (no sensitive data logged)
      } catch (error) {
        // Log sanitized error for debugging (no sensitive data)
        console.error(
          "Failed to create Misskey app for host:",
          misskeyHost,
          "- Error type:",
          error instanceof Error ? error.constructor.name : "unknown"
        );
        // Return generic error to prevent information leakage
        return NextResponse.json(
          { error: "Failed to register application. Please try again later." },
          { status: 500 }
        );
      }
    }

    // Generate auth session
    let authSession;
    try {
      authSession = await client.generateAuthSession(server.appSecret!);
    } catch (error) {
      // If app secret is invalid, clear it and retry
      if (error instanceof MisskeyError && error.isInvalidCredential()) {
        await db
          .update(servers)
          .set({ appSecret: null, updatedAt: new Date() })
          .where(eq(servers.id, server.id));

        return NextResponse.json(
          { error: "App credentials expired. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create auth session" },
        { status: 500 }
      );
    }

    // Store session token with 5 minute expiry
    await createAuthSession(db, authSession.token, {
      host: misskeyHost,
      serverId: server.id,
    });

    // Auth session created (no sensitive data logged)

    return NextResponse.json(authSession);
  } catch (error) {
    // Log only error type, not details that might contain sensitive data
    console.error(
      "Misskey login error:",
      error instanceof Error ? error.constructor.name : "unknown"
    );
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
