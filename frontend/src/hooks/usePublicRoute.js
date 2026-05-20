"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAdminStore } from "@/store/adminStore";

export function usePublicRoute() {
  const router = useRouter();
  const authStore = useAuthStore();
  const adminStore = useAdminStore();

  useEffect(() => {
    if (authStore.hydrated) {
      // If user is logged in as admin, redirect to admin dashboard
      if (adminStore.accessToken) {
        router.replace("/admin");
      }
      // If user is logged in as regular user, redirect to dashboard
      else if (authStore.accessToken) {
        router.replace("/dashboard");
      }
    }
  }, [authStore.accessToken, authStore.hydrated, adminStore.accessToken, router]);

  return { ready: authStore.hydrated };
}
