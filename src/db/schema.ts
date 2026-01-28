import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Server - Misskey instance information
export const servers = sqliteTable("servers", {
  id: text("id").primaryKey(),
  instances: text("instances").notNull().unique(), // hostname (e.g., "yami.ski")
  instanceType: text("instance_type").notNull(), // misskey, cherrypick, sharkey, etc.
  appSecret: text("app_secret"), // Misskey app secret for this instance
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// User - Misskey-linked user account
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull().unique(), // @username@instance.tld
  account: text("account").notNull(), // username only
  hostName: text("host_name").notNull(), // instance hostname
  token: text("token").notNull(), // hashed access token (SHA256)
  serverId: text("server_id")
    .notNull()
    .references(() => servers.id),
  ethAddress: text("eth_address").unique(), // linked ETH wallet address (checksummed)
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// Profile - User profile information
export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// AuthSession - Temporary auth session storage during MiAuth flow
export const authSessions = sqliteTable("auth_sessions", {
  id: text("id").primaryKey(), // token from Misskey
  host: text("host").notNull(),
  serverId: text("server_id").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// WalletNonce - Temporary nonce storage for SIWE verification
export const walletNonces = sqliteTable("wallet_nonces", {
  id: text("id").primaryKey(), // nonce value
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// Type exports for use in application
export type Server = typeof servers.$inferSelect;
export type NewServer = typeof servers.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type AuthSession = typeof authSessions.$inferSelect;
export type NewAuthSession = typeof authSessions.$inferInsert;
export type WalletNonce = typeof walletNonces.$inferSelect;
export type NewWalletNonce = typeof walletNonces.$inferInsert;
