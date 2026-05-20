"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field, PasswordInput } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loading, user, hydrated } = useAdminAuth();
  const [remember, setRemember] = useState(true);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (hydrated && user?.role === "admin") {
      router.replace("/admin");
    }
  }, [hydrated, user, router]);

  async function onSubmit(values) {
    setErrorMessage("");
    try {
      await login(values, remember);
      toast.success("Welcome, admin");
      router.push("/admin");
    } catch (err) {
      const message = err?.message || "Invalid credentials or insufficient permissions";
      setErrorMessage(message);
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
      toast.error(String(message));
    }
  }

  return (
    <AuthShell title="Admin sign in" subtitle="Authenticate with admin credentials to access the control plane." switchText="User portal" switchHref="/login" switchLabel="Login">
      <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.35 }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-white/10" />or continue with email<span className="h-px flex-1 bg-white/10" /></div>
          <Field label="Email" error={errors.email}>
            <Input placeholder="admin@company.com" autoComplete="email" {...register("email", { required: "Email is required" })} />
          </Field>
          <Field label="Password" error={errors.password}>
            <PasswordInput register={register} error={errors.password} />
          </Field>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-400" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm font-medium text-sky-400 transition hover:text-sky-300">
              Forgot password?
            </Link>
          </div>

          {errorMessage && <p className="rounded-2xl border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-300">{errorMessage}</p>}

          <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in as admin"}</Button>
        </form>
      </motion.div>
    </AuthShell>
  );
}
