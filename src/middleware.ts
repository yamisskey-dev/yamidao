import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Security headers for all responses
const securityHeaders = {
  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",
  // Prevent clickjacking
  "X-Frame-Options": "DENY",
  // XSS protection (legacy browsers)
  "X-XSS-Protection": "1; mode=block",
  // Prevent information leakage via referrer
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Restrict permissions
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=()",
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply security headers to all responses
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // Add HSTS for production (only on HTTPS)
  if (
    process.env.NODE_ENV === "production" &&
    request.nextUrl.protocol === "https:"
  ) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  return response;
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
