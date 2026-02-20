"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  user_id: number;
  name: string;
  pseudo: string | null;
  email: string;
  profile_picture: string | null;
  created_at: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (pseudo: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        localStorage.setItem("profile_picture", data.profile_picture ?? "");
        setUser({
          user_id: data.user_id,
          name: data.name,
          pseudo: data.pseudo ?? null,
          email: data.email,
          profile_picture: data.profile_picture ?? null,
          created_at: data.created_at,
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("profile_picture");
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("profile_picture");
    }
  }, []);

  useEffect(() => {
    refreshAuth().finally(() => setLoading(false));
  }, [refreshAuth]);

  const login = useCallback(async (pseudo: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pseudo, password }),
      });

      if (res.ok) {
        await refreshAuth();
        return { ok: true };
      } else if (res.status === 401) {
        return { ok: false, error: "Identifiants incorrects" };
      } else {
        return { ok: false, error: "Erreur serveur" };
      }
    } catch {
      return { ok: false, error: "Erreur réseau" };
    }
  }, [refreshAuth]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore network errors on logout
    }
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("profile_picture");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
