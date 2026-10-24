import type { MisskeyApp, MisskeyAuthSession, MisskeyUserKey } from "./types";

export interface CreateAppParams {
  name: string;
  description: string;
  permission: string[];
  callbackUrl: string;
}

export interface MisskeyApiError {
  error?: {
    code?: string;
    message?: string;
  };
}

// Timeout for outbound requests to Misskey instances
const FETCH_TIMEOUT_MS = 10_000;
// Some instances (e.g. yami.ski) return 403 to requests without a User-Agent
const USER_AGENT = "yamidao/1.0 (+https://github.com/yamisskey-dev/yamidao)";

export class MisskeyApiClient {
  constructor(private host: string) {}

  private async post<T>(endpoint: string, body: object): Promise<T> {
    const res = await fetch(`https://${this.host}/api${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT },
      body: JSON.stringify(body),
      // Workers runtime rejects redirect: "error"; a 3xx shows up as !res.ok
      redirect: "manual",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as MisskeyApiError;
      throw new MisskeyError(res.status, errorData);
    }

    return res.json();
  }

  async createApp(params: CreateAppParams): Promise<MisskeyApp> {
    return this.post<MisskeyApp>("/app/create", params);
  }

  async generateAuthSession(appSecret: string): Promise<MisskeyAuthSession> {
    return this.post<MisskeyAuthSession>("/auth/session/generate", {
      appSecret,
    });
  }

  async getUserKey(appSecret: string, token: string): Promise<MisskeyUserKey> {
    return this.post<MisskeyUserKey>("/auth/session/userkey", {
      appSecret,
      token,
    });
  }
}

export class MisskeyError extends Error {
  constructor(
    public status: number,
    public data: MisskeyApiError
  ) {
    super(data.error?.message || `Misskey API error: ${status}`);
    this.name = "MisskeyError";
  }

  get code(): string | undefined {
    return this.data.error?.code;
  }

  isInvalidCredential(): boolean {
    return (
      this.code === "NO_SUCH_APP" || this.code === "INVALID_CREDENTIAL"
    );
  }
}
