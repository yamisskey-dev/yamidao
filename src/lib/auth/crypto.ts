// Web Crypto API compatible hashing (for Cloudflare Workers)

export async function hashToken(
  accessToken: string,
  appSecret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(accessToken + appSecret);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Generate a unique ID (cuid-like)
export function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${timestamp}${randomPart}`;
}
