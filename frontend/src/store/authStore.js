"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

function setCookie(name, value) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value || ""}; path=/; max-age=${value ? 604800 : 0}; SameSite=Lax`;
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      setTokens: (accessToken, refreshToken) => {
        setCookie("tm_access", accessToken);
        set({ accessToken, refreshToken });
      },
      login: async (payload) => {
        set({ loading: true });
        const { data } = await authService.login(payload);
        setCookie("tm_access", data.access);
        set({ user: data.user, accessToken: data.access, refreshToken: data.refresh, loading: false });
        return data;
      },
      register: async (payload) => {
        set({ loading: true });
        const { data } = await authService.register(payload);
        set({ loading: false });
        return data;
      },
      loadProfile: async () => {
        if (!get().accessToken) return null;
        const { data } = await authService.profile();
        set({ user: data });
        return data;
      },
      updateProfile: async (payload) => {
        const { data } = await authService.updateProfile(payload);
        set({ user: data });
        return data;
      },
      logout: async () => {
        const refresh = get().refreshToken;
        try {
          if (refresh) await authService.logout(refresh);
        } catch {}
        setCookie("tm_access", "");
        set({ user: null, accessToken: null, refreshToken: null, loading: false });
      },
    }),
    {
      name: "task-manager-auth",
      onRehydrateStorage: () => (state) => state?.setHydrated(),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
