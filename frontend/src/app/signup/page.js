"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field, PasswordInput } from "@/components/auth/auth-form";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage() {
  const router = useRouter();
  const { register: registerUser, loading } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(values) {
    await registerUser(values);
    toast.success("Account created. Check the terminal or email for OTP.");
    router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <AuthShell title="Create account" subtitle="Start your workspace with secure JWT authentication." switchText="Already have an account?" switchHref="/login" switchLabel="Sign in">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SocialButtons />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Username" error={errors.username}>
            <Input placeholder="taskpilot" {...register("username", { required: "Username is required" })} />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <Input placeholder="9876543210" {...register("phone")} />
          </Field>
        </div>
        <Field label="Full name" error={errors.full_name}>
          <Input placeholder="Hitesh Kumar" {...register("full_name", { required: "Full name is required" })} />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input placeholder="you@company.com" {...register("email", { required: "Email is required" })} />
        </Field>
        <Field label="Password" error={errors.password}>
          <PasswordInput register={register} error={errors.password} />
        </Field>
        <Button className="w-full" disabled={loading}>{loading ? "Creating..." : "Create workspace account"}</Button>
      </form>
    </AuthShell>
  );
}
