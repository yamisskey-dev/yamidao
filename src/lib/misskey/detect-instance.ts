import type { InstanceType, MisskeyMeta } from "./types";

// Allowed Misskey instances for YAMI DAO authentication
// Only these hosts can authenticate with the DAO
const ALLOWED_HOSTS = [
  "yami.ski",
  "beta.yami.ski",
  "localhost",
  "localhost:3000",
  "127.0.0.1",
  "127.0.0.1:3000",
] as const;

export function isAllowedHost(host: string): boolean {
  const normalizedHost = host.toLowerCase().trim();
  return ALLOWED_HOSTS.some(
    (allowed) =>
      normalizedHost === allowed ||
      normalizedHost.startsWith(`${allowed}:`) ||
      (allowed === "localhost" && normalizedHost.startsWith("localhost"))
  );
}

interface NodeInfo {
  software?: {
    name?: string;
  };
}

interface NodeInfoLink {
  rel: string;
  href: string;
}

export async function detectInstance(host: string): Promise<InstanceType | null> {
  try {
    // First, try Misskey API directly (most reliable for Misskey forks)
    const misskeyType = await detectMisskeyByApi(host);
    if (misskeyType) {
      return misskeyType;
    }

    // Fallback to nodeinfo for non-Misskey instances
    const nodeInfoType = await detectByNodeInfo(host);
    if (nodeInfoType) {
      return nodeInfoType;
    }

    return null;
  } catch (error) {
    console.error(`Failed to detect instance type for ${host}:`, error);
    return null;
  }
}

async function detectMisskeyByApi(host: string): Promise<InstanceType | null> {
  try {
    const metaResponse = await fetch(`https://${host}/api/meta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });

    if (!metaResponse.ok) {
      return null;
    }

    const meta: MisskeyMeta = await metaResponse.json();

    // Check if MiAuth is supported (indicates Misskey-like instance)
    if (meta.features?.miauth === true) {
      const version = meta.version?.toLowerCase() || "";

      if (version.includes("cherrypick")) {
        return "cherrypick";
      }
      if (version.includes("sharkey")) {
        return "sharkey";
      }
      if (version.includes("iceshrimp")) {
        return "iceshrimp";
      }

      return "misskey";
    }

    // Even without miauth feature flag, if /api/meta works it's likely Misskey
    if (meta.version) {
      return "misskey";
    }

    return null;
  } catch {
    return null;
  }
}

async function detectByNodeInfo(host: string): Promise<InstanceType | null> {
  try {
    const nodeInfoResponse = await fetch(`https://${host}/.well-known/nodeinfo`);

    if (!nodeInfoResponse.ok) {
      return null;
    }

    const nodeInfoLinks = (await nodeInfoResponse.json()) as {
      links?: NodeInfoLink[];
    };
    const nodeInfoUrl = nodeInfoLinks.links?.find(
      (link: NodeInfoLink) =>
        link.rel === "http://nodeinfo.diaspora.software/ns/schema/2.1" ||
        link.rel === "http://nodeinfo.diaspora.software/ns/schema/2.0"
    )?.href;

    if (!nodeInfoUrl) {
      return null;
    }

    const infoResponse = await fetch(nodeInfoUrl);
    if (!infoResponse.ok) {
      return null;
    }

    const nodeInfo: NodeInfo = await infoResponse.json();
    const softwareName = nodeInfo.software?.name?.toLowerCase();

    switch (softwareName) {
      case "misskey":
        return "misskey";
      case "cherrypick":
        return "cherrypick";
      case "iceshrimp":
        return "iceshrimp";
      case "sharkey":
        return "sharkey";
      case "mastodon":
        return "mastodon";
      case "iceshrimp.net":
        return "Iceshrimp.NET";
      default:
        return null;
    }
  } catch {
    return null;
  }
}

export function isMisskeyLike(type: InstanceType | null): boolean {
  if (!type) return false;
  return ["misskey", "cherrypick", "iceshrimp", "sharkey"].includes(type);
}
