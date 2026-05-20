"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Providers({ children }) {
  const { hydrated, accessToken, user, loadProfile } = useAuthStore();

  useEffect(() => {
    if (hydrated && accessToken && !user) {
      loadProfile().catch(() => {});
    }
  }, [hydrated, accessToken, user, loadProfile]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(9, 9, 14, 0.9)",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
          },
        }}
      />
    </ThemeProvider>
  );
}
