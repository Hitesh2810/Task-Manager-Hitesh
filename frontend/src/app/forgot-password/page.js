"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    await authService.forgotPassword(values);
    toast.success("Reset OTP sent");
  }

  return (
    <AuthShell title="Reset access" subtitle="Send a one-time password to your verified email." switchText="Remembered it?" switchHref="/login" switchLabel="Back to login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" error={errors.email}>
          <Input placeholder="you@company.com" {...register("email", { required: "Email is required" })} />
        </Field>
        <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send reset OTP"}</Button>
      </form>
    </AuthShell>
  );
}
