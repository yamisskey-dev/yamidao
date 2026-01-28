"use client";

import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Wallet, Loader2, X, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createSiweMessage } from "@/lib/wallet/siwe";

/**
 * ConnectWallet - ウォレット接続・リンクフロー専用
 * 注意: このコンポーネントは未リンク時のみ使用すること
 * リンク済みの場合は親コンポーネントで直接表示する
 */
export function ConnectWallet() {
  const { refreshUser } = useAuth();
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [isLinking, setIsLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTriedAutoLink, setHasTriedAutoLink] = useState(false);

  // Deduplicate connectors and filter out generic "Injected" if specific wallets exist
  const uniqueConnectors = useMemo(() => {
    const seen = new Set<string>();
    const filtered = connectors.filter((connector) => {
      if (seen.has(connector.name)) return false;
      seen.add(connector.name);
      return true;
    });
    // Hide "Injected" if other specific wallets are available
    const hasSpecificWallets = filtered.some(
      (c) => c.name !== "Injected" && c.name !== "WalletConnect"
    );
    if (hasSpecificWallets) {
      return filtered.filter((c) => c.name !== "Injected");
    }
    return filtered;
  }, [connectors]);

  const handleLink = useCallback(async () => {
    if (!address || !chain) return;
    setIsLinking(true);
    setError(null);

    try {
      // Get nonce from server
      const nonceRes = await fetch("/api/wallet/nonce", { method: "POST" });
      if (!nonceRes.ok) {
        throw new Error("Failed to get nonce");
      }
      const { nonce } = (await nonceRes.json()) as { nonce: string };

      // Create SIWE message
      const message = createSiweMessage(
        address,
        nonce,
        chain.id,
        window.location.host,
        window.location.origin
      );

      // Sign message
      const signature = await signMessageAsync({ message });

      // Verify on server
      const verifyRes = await fetch("/api/wallet/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });

      if (!verifyRes.ok) {
        const data = (await verifyRes.json()) as { error?: string };
        throw new Error(data.error || "Verification failed");
      }

      // Refresh user to get updated ethAddress, then disconnect wallet
      await refreshUser();
      disconnect();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("rejected")) {
          setError("署名がキャンセルされました");
        } else {
          setError(err.message);
        }
      } else {
        setError("ウォレットのリンクに失敗しました");
      }
    } finally {
      setIsLinking(false);
    }
  }, [address, chain, signMessageAsync, refreshUser, disconnect]);

  // Auto-link when wallet connects (standard dApp behavior)
  useEffect(() => {
    if (isConnected && address && chain && !hasTriedAutoLink && !isLinking) {
      setHasTriedAutoLink(true);
      const timer = setTimeout(() => {
        handleLink();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isConnected, address, chain, hasTriedAutoLink, isLinking, handleLink]);

  // State 1: Not connected - show connector buttons
  if (!isConnected) {
    return (
      <div className="space-y-1.5">
        {uniqueConnectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isConnecting}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm bg-muted/30 hover:bg-muted/60 border border-border/50 rounded-lg transition-colors disabled:opacity-50"
          >
            {isConnecting ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : connector.icon ? (
              <Image
                src={connector.icon}
                alt={connector.name}
                width={20}
                height={20}
                className="rounded"
                unoptimized
              />
            ) : (
              <Wallet className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="font-medium">{connector.name}</span>
          </button>
        ))}
      </div>
    );
  }

  // State 2: Connected - show address and link/status
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-2.5 bg-muted/30 border border-border/50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-mono text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
          title="切断"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {isLinking ? (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          署名を待っています...
        </div>
      ) : (
        <div className="space-y-2">
          {error && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
          <button
            onClick={handleLink}
            disabled={isLinking}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            署名してリンク
          </button>
        </div>
      )}
    </div>
  );
}
