import { AdminAuthProvider } from "@/context/AdminAuthContext";

export const metadata = {
  title: "Admin | TaskSphere",
  description: "Admin control panel for TaskSphere.",
};

export default function AdminLayout({ children }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
