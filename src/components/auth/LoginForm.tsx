"use client";

import { useState } from "react";
import { Cloud, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Default to yami.ski (production instance)
const DEFAULT_HOST = "yami.ski";

export function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return null;
  }

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await login(DEFAULT_HOST);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
      setIsLoading(false);
    }
  };

  return (
    <div className="dao-card glass animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <Cloud className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Misskey認証で参加</h3>
      </div>

      <p className="text-muted-foreground text-sm mb-6">
        やみすきーアカウントでDAOメンバーになれます。
      </p>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="dao-btn-primary w-full flex items-center justify-center gap-2 py-3"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Cloud className="h-5 w-5" />
            yami.ski でログイン
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive mt-4">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
