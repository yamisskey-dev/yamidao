import { NextResponse } from "next/server";
import { createLogoutCookie } from "@/lib/auth/jwt";

export const runtime = "edge";

export async function POST() {
  const isProduction = process.env.NODE_ENV === "production";
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", createLogoutCookie(isProduction));
  return response;
}
