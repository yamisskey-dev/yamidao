import { NextRequest, NextResponse } from "next/server";
import { inArray } from "drizzle-orm";
import { getAddress, isAddress } from "viem";
import { getAppContext } from "@/lib/env";
import { users } from "@/db/schema";

export const runtime = "edge";

// Maximum addresses per request (prevent abuse)
const MAX_ADDRESSES = 1000;

interface VotingPowerRequest {
  addresses: string[];
}

/**
 * Snapshot api-post strategy endpoint
 * Returns voting power for each address (1 = linked member, 0 = not linked)
 *
 * POST /api/governance/voting-power
 * Body: { "addresses": ["0x123...", "0x456..."] }
 * Response: { "0x123...": 1, "0x456...": 0 }
 */
export async function POST(req: NextRequest) {
  let data: VotingPowerRequest;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!data.addresses || !Array.isArray(data.addresses)) {
    return NextResponse.json(
      { error: "addresses array is required" },
      { status: 400 }
    );
  }

  if (data.addresses.length === 0) {
    return NextResponse.json({});
  }

  if (data.addresses.length > MAX_ADDRESSES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_ADDRESSES} addresses per request` },
      { status: 400 }
    );
  }

  // Validate and normalize addresses
  const normalizedAddresses: string[] = [];
  const addressMap = new Map<string, string>(); // normalized -> original

  for (const addr of data.addresses) {
    if (typeof addr !== "string") continue;

    try {
      if (isAddress(addr)) {
        const checksummed = getAddress(addr);
        normalizedAddresses.push(checksummed);
        addressMap.set(checksummed, addr);
      }
    } catch {
      // Invalid address, skip
    }
  }

  if (normalizedAddresses.length === 0) {
    // Return 0 for all original addresses
    const result: Record<string, number> = {};
    for (const addr of data.addresses) {
      if (typeof addr === "string") {
        result[addr] = 0;
      }
    }
    return NextResponse.json(result);
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

    // Build response: 1 for linked, 0 for not linked
    // Use original address format from request
    const result: Record<string, number> = {};

    for (const addr of data.addresses) {
      if (typeof addr !== "string") continue;

      try {
        if (isAddress(addr)) {
          const checksummed = getAddress(addr);
          result[addr] = linkedSet.has(checksummed) ? 1 : 0;
        } else {
          result[addr] = 0;
        }
      } catch {
        result[addr] = 0;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Voting power error:",
      error instanceof Error ? error.constructor.name : "unknown"
    );
    return NextResponse.json(
      { error: "Failed to check voting power" },
      { status: 500 }
    );
  }
}
