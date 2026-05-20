"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

function setCookie(name, value, maxAge = 604800) {
  if (typeof document === "undefined") return;
  let cookie = `${name}=${value || ""}; path=/; SameSite=Lax`;
  if (value) {
    if (typeof maxAge === "number") cookie += `; max-age=${maxAge}`;
  } else {
    cookie += "; max-age=0";
  }
  document.cookie = cookie;
}

export const useAdminStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      setTokens: (accessToken, refreshToken, user, remember = true) => {
        const expiration = remember ? 604800 : undefined;
        setCookie("tm_admin_access", accessToken, expiration);
        setCookie("tm_admin_refresh", refreshToken, expiration);
        setCookie("tm_admin_role", user?.role || "", expiration);
        set({ user, accessToken, refreshToken });
      },
      login: async (payload, remember = true) => {
        set({ loading: true });
        const { data } = await authService.login(payload);
        const user = data.user || null;
        const isAdmin = user?.is_staff || user?.is_superuser || user?.is_admin || user?.role === "admin" || user?.role === "superadmin";
        if (!isAdmin) {
          set({ loading: false });
          throw new Error("Insufficient permissions");
        }
        set({ user, loading: false });
        get().setTokens(data.access, data.refresh, user, remember);
        return data;
      },
      loadProfile: async () => {
        if (!get().accessToken) return null;
        const { data } = await authService.profile();
        set({ user: data });
        setCookie("tm_admin_role", data?.role || "");
        return data;
      },
      logout: async () => {
        const refresh = get().refreshToken;
        try {
          if (refresh) await authService.logout(refresh);
        } catch {}
        setCookie("tm_admin_access", "");
        setCookie("tm_admin_refresh", "");
        setCookie("tm_admin_role", "");
        set({ user: null, accessToken: null, refreshToken: null, loading: false });
      },
    }),
    {
      name: "task-manager-admin-auth",
      onRehydrateStorage: () => (state) => state?.setHydrated(),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
