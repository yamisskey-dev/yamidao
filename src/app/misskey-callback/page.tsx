"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const token = searchParams.get("token");
      const host = localStorage.getItem("yamidao_server");

      if (!token) {
        setError("認証トークンが見つかりません");
        return;
      }

      if (!host) {
        setError("サーバー情報が見つかりません");
        return;
      }

      try {
        const res = await fetch("/api/auth/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, host }),
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = (await res.json()) as { error?: string };
          throw new Error(errorData.error || "認証に失敗しました");
        }

        const data = (await res.json()) as {
          handle: string;
          displayName?: string;
          avatarUrl?: string;
        };

        // Store user info in localStorage for quick access
        localStorage.setItem("yamidao_handle", data.handle);
        if (data.displayName) {
          localStorage.setItem("yamidao_displayName", data.displayName);
        }
        if (data.avatarUrl) {
          localStorage.setItem("yamidao_avatarUrl", data.avatarUrl);
        }

        // Refresh user state in AuthContext
        await refreshUser();

        // Redirect to home page
        router.replace("/");
      } catch (err) {
        console.error("Callback error:", err);
        setError(err instanceof Error ? err.message : "認証に失敗しました");
      }
    };

    processCallback();
  }, [searchParams, router, refreshUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="dao-card max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-destructive mb-4">
            認証エラー
          </h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => router.push("/join")}
            className="dao-btn-primary"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="dao-card max-w-md w-full text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <h1 className="text-xl font-bold mb-2">認証中...</h1>
        <p className="text-muted-foreground">
          Misskeyアカウントを確認しています
        </p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="dao-card max-w-md w-full text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <h1 className="text-xl font-bold mb-2">読み込み中...</h1>
      </div>
    </div>
  );
}

export default function MisskeyCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CallbackContent />
    </Suspense>
  );
}
