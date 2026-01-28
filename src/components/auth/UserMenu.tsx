"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogOut, User, ChevronDown, Wallet, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { ConnectWallet } from "@/components/wallet/ConnectWallet";

export function UserMenu() {
  const { user, logout, refreshUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [unlinkError, setUnlinkError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleUnlink = async () => {
    setIsUnlinking(true);
    setUnlinkError(null);
    try {
      const res = await fetch("/api/wallet/unlink", { method: "DELETE" });
      if (res.ok) {
        await refreshUser();
      } else {
        setUnlinkError("リンク解除に失敗しました");
      }
    } catch {
      setUnlinkError("リンク解除に失敗しました");
    } finally {
      setIsUnlinking(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!user) return null;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.displayName || user.account}
            width={28}
            height={28}
            className="rounded-full ring-2 ring-primary/30"
            unoptimized
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
            <User className="h-4 w-4 text-primary" />
          </div>
        )}
        <ChevronDown
          className={`h-4 w-4 text-primary/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-xl py-2 z-50"
          role="menu"
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.displayName || user.account}
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">
                  {user.displayName || user.account}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.handle}
                </p>
              </div>
            </div>
          </div>

          {/* Wallet section */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">ウォレット接続</span>
            </div>
            {user.ethAddress ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="font-mono text-muted-foreground">
                      {user.ethAddress.slice(0, 6)}...{user.ethAddress.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={handleUnlink}
                    disabled={isUnlinking}
                    className="text-xs text-destructive hover:underline disabled:opacity-50"
                  >
                    {isUnlinking ? "解除中..." : "リンク解除"}
                  </button>
                </div>
                {unlinkError && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {unlinkError}
                  </p>
                )}
              </div>
            ) : (
              <WalletProvider>
                <ConnectWallet />
              </WalletProvider>
            )}
          </div>

          {/* Logout */}
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-3 transition-colors"
              role="menuitem"
            >
              <LogOut className="h-4 w-4" />
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
