// Misskey instance types
export type InstanceType =
  | "misskey"
  | "cherrypick"
  | "sharkey"
  | "iceshrimp"
  | "mastodon"
  | "Iceshrimp.NET";

// Misskey API response types
export interface MisskeyMeta {
  features?: {
    miauth?: boolean;
  };
  version?: string;
}

export interface MisskeyUser {
  id: string;
  username: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export interface MisskeyApp {
  id: string;
  secret: string;
}

export interface MisskeyAuthSession {
  token: string;
  url: string;
}

export interface MisskeyUserKey {
  accessToken: string;
  user: MisskeyUser;
}
