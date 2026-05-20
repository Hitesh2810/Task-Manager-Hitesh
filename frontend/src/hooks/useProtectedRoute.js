"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useProtectedRoute() {
  const router = useRouter();
  const { accessToken, hydrated } = useAuthStore();

  useEffect(() => {
    if (hydrated && !accessToken) router.replace("/login");
  }, [accessToken, hydrated, router]);

  return { ready: hydrated && Boolean(accessToken) };
}
