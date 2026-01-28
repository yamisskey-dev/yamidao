import { eq } from "drizzle-orm";
import { Database, users, profiles } from "@/db";
import { generateId } from "@/lib/auth/crypto";
import type { MisskeyUser } from "@/lib/misskey/types";

export interface UpsertUserParams {
  hostName: string;
  hashedToken: string;
  serverId: string;
  misskeyUser: MisskeyUser;
}

export interface UserWithProfile {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string | null;
}

export class UserService {
  constructor(private db: Database) {}

  async findByHandle(handle: string) {
    return this.db.query.users.findFirst({
      where: eq(users.handle, handle),
    });
  }

  async upsertFromMisskey(params: UpsertUserParams): Promise<UserWithProfile> {
    const { hostName, hashedToken, serverId, misskeyUser } = params;
    const handle = `@${misskeyUser.username}@${hostName}`;
    const displayName = misskeyUser.name || misskeyUser.username;
    const avatarUrl = misskeyUser.avatarUrl ?? null;
    const now = new Date();

    const existingUser = await this.findByHandle(handle);

    if (existingUser) {
      // Update existing user
      await this.db
        .update(users)
        .set({ token: hashedToken, updatedAt: now })
        .where(eq(users.id, existingUser.id));

      await this.db
        .update(profiles)
        .set({ displayName, avatarUrl, updatedAt: now })
        .where(eq(profiles.userId, existingUser.id));

      return {
        id: existingUser.id,
        handle,
        displayName,
        avatarUrl,
      };
    }

    // Create new user
    const userId = generateId();
    const profileId = generateId();

    await this.db.insert(users).values({
      id: userId,
      handle,
      account: misskeyUser.username,
      hostName,
      token: hashedToken,
      serverId,
      createdAt: now,
      updatedAt: now,
    });

    await this.db.insert(profiles).values({
      id: profileId,
      userId,
      displayName,
      avatarUrl,
      createdAt: now,
      updatedAt: now,
    });

    return { id: userId, handle, displayName, avatarUrl };
  }
}
