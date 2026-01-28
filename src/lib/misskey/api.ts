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

export class MisskeyApiClient {
  constructor(private host: string) {}

  private async post<T>(endpoint: string, body: object): Promise<T> {
    const res = await fetch(`https://${this.host}/api${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
