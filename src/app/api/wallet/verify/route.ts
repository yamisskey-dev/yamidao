import { NextRequest, NextResponse } from "next/server";
import { eq, and, ne, lt } from "drizzle-orm";
import { getAddress, verifyMessage } from "viem";
import { getAppContext } from "@/lib/env";
import { users, walletNonces } from "@/db/schema";
import { getTokenFromCookie, verifyJWT } from "@/lib/auth/jwt";

// Parse SIWE message without siwe library (Edge compatible)
function parseSiweMessage(message: string): { address: string; nonce: string } | null {
  try {
    // SIWE message format has address after first line and nonce in the message
    const lines = message.split("\n");

    // Find address (line starting with 0x)
    let address = "";
    for (const line of lines) {
      if (line.startsWith("0x") && line.length === 42) {
        address = line;
        break;
      }
    }

    // Find nonce
    const nonceMatch = message.match(/Nonce: ([a-fA-F0-9]+)/);
    const nonce = nonceMatch ? nonceMatch[1] : "";

    if (!address || !nonce) {
      return null;
    }

    return { address, nonce };
  } catch {
    return null;
  }
}

export const runtime = "edge";

interface VerifyRequest {
  message: string;
  signature: string;
}

export async function POST(req: NextRequest) {
  let data: VerifyRequest;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!data.message || !data.signature) {
    return NextResponse.json(
      { error: "Message and signature are required" },
      { status: 400 }
    );
  }

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

    // Parse SIWE message
    const parsed = parseSiweMessage(data.message);
    if (!parsed) {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }
    const { nonce, address } = parsed;

    // Verify nonce exists and belongs to this user
    const storedNonce = await db.query.walletNonces.findFirst({
      where: eq(walletNonces.id, nonce),
    });

    if (!storedNonce) {
      return NextResponse.json({ error: "Invalid nonce" }, { status: 400 });
    }

    if (storedNonce.userId !== payload.userId) {
      return NextResponse.json({ error: "Nonce mismatch" }, { status: 400 });
    }

    if (storedNonce.expiresAt < new Date()) {
      // Clean up expired nonce
      await db.delete(walletNonces).where(eq(walletNonces.id, nonce));
      return NextResponse.json({ error: "Nonce expired" }, { status: 400 });
    }

    // Verify signature using viem
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message: data.message,
      signature: data.signature as `0x${string}`,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Checksum the address
    const checksummedAddress = getAddress(address);

    // Check if this address is already linked to another user
    const existingUser = await db.query.users.findFirst({
      where: and(
        eq(users.ethAddress, checksummedAddress),
        ne(users.id, payload.userId)
      ),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "このウォレットは既に別のアカウントにリンクされています" },
        { status: 409 }
      );
    }

    // Update user with ETH address
    await db
      .update(users)
      .set({ ethAddress: checksummedAddress, updatedAt: new Date() })
      .where(eq(users.id, payload.userId));

    // Delete used nonce
    await db.delete(walletNonces).where(eq(walletNonces.id, nonce));

    // Clean up any expired nonces for this user
    await db
      .delete(walletNonces)
      .where(lt(walletNonces.expiresAt, new Date()));

    return NextResponse.json({
      success: true,
      address: checksummedAddress,
    });
  } catch (error) {
    console.error("Wallet verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
