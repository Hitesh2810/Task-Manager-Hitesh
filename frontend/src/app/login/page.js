"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field, PasswordInput } from "@/components/auth/auth-form";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { usePublicRoute } from "@/hooks/usePublicRoute";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  const { ready } = usePublicRoute();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(values) {
    try {
      await login(values);
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.detail || err?.message || "Invalid credentials";
      toast.error(String(message));
    }
  }

  if (!ready) {
    return null;
  }

  return (
    <AuthShell title="Welcome back" subtitle="Enter your credentials to unlock your command center." switchText="New here?" switchHref="/signup" switchLabel="Create account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SocialButtons />
        <div className="flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-white/10" />or continue with email<span className="h-px flex-1 bg-white/10" /></div>
        <Field label="Email" error={errors.email}>
          <Input placeholder="you@company.com" {...register("email", { required: "Email is required" })} />
        </Field>
        <Field label="Password" error={errors.password}>
          <PasswordInput register={register} error={errors.password} />
        </Field>
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-semibold text-sky-500">Forgot password?</Link>
        </div>
        <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
    </AuthShell>
  );
}
