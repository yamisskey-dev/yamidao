import * as jose from "jose";

const JWT_ISSUER = "yamidao";
const JWT_AUDIENCE = "yamidao-users";
const JWT_EXPIRY = "30d"; // 30 days

export interface JWTPayload {
  sub: string; // user handle (@username@instance.tld)
  userId: string;
  hostName: string;
  iat?: number;
  exp?: number;
}

function getSecret(jwtSecret: string): Uint8Array {
  return new TextEncoder().encode(jwtSecret);
}

export async function createJWT(
  payload: Omit<JWTPayload, "iat" | "exp">,
  jwtSecret: string
): Promise<string> {
  const secret = getSecret(jwtSecret);
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(JWT_EXPIRY)
    .sign(secret);
}

export async function verifyJWT(
  token: string,
  jwtSecret: string
): Promise<JWTPayload | null> {
  try {
    const secret = getSecret(jwtSecret);
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return cookies["yamidao-token"] || null;
}

export function createTokenCookie(token: string, isProduction: boolean): string {
  const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
  return `yamidao-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${
    isProduction ? "; Secure" : ""
  }`;
}

export function createLogoutCookie(): string {
  return "yamidao-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
}
