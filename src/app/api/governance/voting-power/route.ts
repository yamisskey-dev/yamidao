import { NextRequest, NextResponse } from "next/server";
import { inArray } from "drizzle-orm";
import { getAddress, isAddress } from "viem";
import { getAppContext } from "@/lib/env";
import { users } from "@/db/schema";

export const runtime = "edge";

// Security constants
const MAX_ADDRESSES = 500; // Reduced for security
const MAX_BODY_SIZE = 50 * 1024; // 50KB max request body
const CACHE_TTL = 60; // Cache for 60 seconds

// Allowed origins for CORS (Snapshot domains)
const ALLOWED_ORIGINS = [
  "https://snapshot.org",
  "https://hub.snapshot.org",
  "https://score.snapshot.org",
  "https://testnet.snapshot.org",
];

interface VotingPowerRequest {
  options?: Record<string, unknown>;
  network?: string;
  snapshot?: string | number;
  addresses: string[];
}

// Add CORS headers for Snapshot
function corsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Cache-Control": `public, max-age=${CACHE_TTL}`,
  };

  // Only allow specific origins
  if (origin && ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }

  return headers;
}

// Handle preflight requests
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

/**
 * Snapshot api-post strategy endpoint
 * Returns voting power for each address (1 = linked member, 0 = not linked)
 *
 * POST /api/governance/voting-power
 * Body: { "options": {...}, "network": "10", "snapshot": "latest", "addresses": ["0x123...", "0x456..."] }
 * Response: { "score": [{ "address": "0x123...", "score": 1 }, { "address": "0x456...", "score": 0 }] }
 */
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  // Validate Content-Type
  const contentType = req.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415, headers }
    );
  }

  // Check Content-Length to prevent oversized requests
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: "Request body too large" },
      { status: 413, headers }
    );
  }

  let data: VotingPowerRequest;

  try {
    const text = await req.text();
    // Double-check size after reading
    if (text.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413, headers }
      );
    }
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers }
    );
  }

  // Validate request structure
  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400, headers }
    );
  }

  if (!data.addresses || !Array.isArray(data.addresses)) {
    return NextResponse.json(
      { error: "addresses array is required" },
      { status: 400, headers }
    );
  }

  if (data.addresses.length === 0) {
    return NextResponse.json({ score: [] }, { headers });
  }

  if (data.addresses.length > MAX_ADDRESSES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_ADDRESSES} addresses per request` },
      { status: 400, headers }
    );
  }

  // Validate and normalize addresses with strict checks
  const normalizedAddresses: string[] = [];
  const seenAddresses = new Set<string>(); // Prevent duplicates

  for (const addr of data.addresses) {
    // Strict type check
    if (typeof addr !== "string") continue;
    // Length check (ETH address is 42 chars including 0x)
    if (addr.length !== 42) continue;
    // Must start with 0x
    if (!addr.startsWith("0x")) continue;

    try {
      if (isAddress(addr)) {
        const checksummed = getAddress(addr);
        // Skip duplicates
        if (!seenAddresses.has(checksummed)) {
          seenAddresses.add(checksummed);
          normalizedAddresses.push(checksummed);
        }
      }
    } catch {
      // Invalid address, skip silently
    }
  }

  if (normalizedAddresses.length === 0) {
    const score = data.addresses
      .filter((addr) => typeof addr === "string" && addr.length === 42)
      .map((addr) => {
        try {
          return { address: getAddress(addr), score: "0" };
        } catch {
          return { address: addr, score: "0" };
        }
      });
    return NextResponse.json({ score }, { headers });
  }

  try {
    const { db } = getAppContext();

    // Query linked addresses from database
    const linkedUsers = await db
      .select({ ethAddress: users.ethAddress })
      .from(users)
      .where(inArray(users.ethAddress, normalizedAddresses));

    // Create set of linked addresses for fast lookup
    const linkedSet = new Set(
      linkedUsers
        .map((u) => u.ethAddress)
        .filter((addr): addr is string => addr !== null)
    );

    // Build response in Snapshot api-post format
    // address must be checksummed, score must be string for formatUnits
    const score: { address: string; score: string }[] = [];

    for (const addr of data.addresses) {
      if (typeof addr !== "string" || addr.length !== 42) continue;

      try {
        if (isAddress(addr)) {
          const checksummed = getAddress(addr);
          score.push({
            address: checksummed,
            score: linkedSet.has(checksummed) ? "1" : "0",
          });
        } else {
          score.push({ address: addr, score: "0" });
        }
      } catch {
        score.push({ address: addr, score: "0" });
      }
    }

    return NextResponse.json({ score }, { headers });
  } catch (error) {
    console.error(
      "Voting power error:",
      error instanceof Error ? error.constructor.name : "unknown"
    );
    return NextResponse.json(
      { error: "Failed to check voting power" },
      { status: 500, headers }
    );
  }
}
