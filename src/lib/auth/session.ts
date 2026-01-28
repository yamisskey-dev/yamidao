import { eq, lt } from "drizzle-orm";
import { Database, authSessions } from "@/db";

const SESSION_EXPIRY_SECONDS = 300; // 5 minutes

export interface SessionData {
  host: string;
  serverId: string;
}

// Create a new auth session
export async function createAuthSession(
  db: Database,
  token: string,
  data: SessionData
): Promise<void> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_SECONDS * 1000);

  await db.insert(authSessions).values({
    id: token,
    host: data.host,
    serverId: data.serverId,
    expiresAt,
    createdAt: now,
  });
}

// Get auth session by token
export async function getAuthSession(
  db: Database,
  token: string
): Promise<SessionData | null> {
  const session = await db.query.authSessions.findFirst({
    where: eq(authSessions.id, token),
  });

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (session.expiresAt < new Date()) {
    // Clean up expired session
    await db.delete(authSessions).where(eq(authSessions.id, token));
    return null;
  }

  return {
    host: session.host,
    serverId: session.serverId,
  };
}

// Delete auth session
export async function deleteAuthSession(
  db: Database,
  token: string
): Promise<void> {
  await db.delete(authSessions).where(eq(authSessions.id, token));
}

// Clean up expired sessions (can be called periodically)
export async function cleanupExpiredSessions(db: Database): Promise<number> {
  const result = await db
    .delete(authSessions)
    .where(lt(authSessions.expiresAt, new Date()));

  // D1Result has 'meta.rows_written' instead of 'rowsAffected'
  return (result as { meta?: { rows_written?: number } }).meta?.rows_written || 0;
}
