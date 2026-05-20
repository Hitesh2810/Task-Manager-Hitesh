"use client";

import { createContext } from "react";
import { useAdminStore } from "@/store/adminStore";

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const { user, accessToken, refreshToken, loading, hydrated, login, logout } = useAdminStore();
  const isAdmin = Boolean(user?.role === "admin" || user?.role === "superadmin");

  return (
    <AdminAuthContext.Provider value={{ user, accessToken, refreshToken, loading, hydrated, login, logout, isAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
