import { isAllowedHost } from "../detect-instance";

// NODE_ENV is typed as read-only by Next.js, so go through a mutable view
const env = process.env as Record<string, string | undefined>;

describe("isAllowedHost", () => {
  const originalNodeEnv = env.NODE_ENV;

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
  });

  it("allows exact production hosts", () => {
    expect(isAllowedHost("yami.ski")).toBe(true);
    expect(isAllowedHost("beta.yami.ski")).toBe(true);
  });

  it("normalizes case and whitespace", () => {
    expect(isAllowedHost("  YAMI.SKI ")).toBe(true);
  });

  it("rejects hosts that merely start with an allowed host", () => {
    expect(isAllowedHost("yami.ski.evil.com")).toBe(false);
    expect(isAllowedHost("localhost.attacker.tld")).toBe(false);
    expect(isAllowedHost("yami.ski:443")).toBe(false);
    expect(isAllowedHost("localhost:1234")).toBe(false);
  });

  it("rejects unrelated hosts", () => {
    expect(isAllowedHost("misskey.io")).toBe(false);
    expect(isAllowedHost("")).toBe(false);
  });

  it("allows local hosts only outside production", () => {
    env.NODE_ENV = "test";
    expect(isAllowedHost("localhost")).toBe(true);
    expect(isAllowedHost("localhost:3000")).toBe(true);
    expect(isAllowedHost("127.0.0.1")).toBe(true);
    expect(isAllowedHost("127.0.0.1:3000")).toBe(true);

    env.NODE_ENV = "production";
    expect(isAllowedHost("localhost")).toBe(false);
    expect(isAllowedHost("localhost:3000")).toBe(false);
    expect(isAllowedHost("127.0.0.1")).toBe(false);
    expect(isAllowedHost("127.0.0.1:3000")).toBe(false);
  });
});
