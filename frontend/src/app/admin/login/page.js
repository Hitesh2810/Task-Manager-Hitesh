"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field, PasswordInput } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/store/adminStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loading } = useAdminStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(values) {
    try {
      await login(values);
      toast.success("Welcome, admin");
      router.push("/admin");
    } catch (err) {
      const message = err?.message || "Invalid credentials or insufficient permissions";
      toast.error(String(message));
    }
  }

  return (
    <AuthShell title="Admin sign in" subtitle="Authenticate with admin credentials to access the control plane." switchText="Back to app" switchHref="/login" switchLabel="User login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-white/10" />or continue with email<span className="h-px flex-1 bg-white/10" /></div>
        <Field label="Email" error={errors.email}>
          <Input placeholder="admin@company.com" {...register("email", { required: "Email is required" })} />
        </Field>
        <Field label="Password" error={errors.password}>
          <PasswordInput register={register} error={errors.password} />
        </Field>
        <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in as admin"}</Button>
      </form>
    </AuthShell>
  );
}
