"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

function setCookie(name, value) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value || ""}; path=/; max-age=${value ? 604800 : 0}; SameSite=Lax`;
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
      setTokens: (accessToken, refreshToken) => {
        setCookie("tm_admin_access", accessToken);
        set({ accessToken, refreshToken });
      },
      login: async (payload) => {
        set({ loading: true });
        const { data } = await authService.login(payload);
        // Accept if user has admin privileges
        const user = data.user || null;
        const isAdmin = user?.is_staff || user?.is_superuser || user?.is_admin || user?.role === "admin" || user?.role === "superadmin";
        if (!isAdmin) {
          set({ loading: false });
          throw new Error("Insufficient permissions");
        }
        setCookie("tm_admin_access", data.access);
        set({ user, accessToken: data.access, refreshToken: data.refresh, loading: false });
        return data;
      },
      loadProfile: async () => {
        if (!get().accessToken) return null;
        const { data } = await authService.profile();
        set({ user: data });
        return data;
      },
      logout: async () => {
        const refresh = get().refreshToken;
        try {
          if (refresh) await authService.logout(refresh);
        } catch {}
        setCookie("tm_admin_access", "");
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
