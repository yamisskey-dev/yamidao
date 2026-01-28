"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  handle: string;
  account: string;
  hostName: string;
  displayName?: string;
  avatarUrl?: string;
  ethAddress?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (host: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const userData = (await res.json()) as User;
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (host: string) => {
    const res = await fetch("/api/auth/misskey-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host }),
    });

    if (!res.ok) {
      const errorData = (await res.json()) as { error?: string };
      throw new Error(errorData.error || "Login failed");
    }

    const authSession = (await res.json()) as { url: string; token: string };

    // Store host in localStorage for callback
    localStorage.setItem("yamidao_server", host);

    // Redirect to Misskey auth page
    window.location.href = authSession.url;
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      // Clear localStorage
      localStorage.removeItem("yamidao_server");
      localStorage.removeItem("yamidao_handle");
      localStorage.removeItem("yamidao_displayName");
      localStorage.removeItem("yamidao_avatarUrl");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
