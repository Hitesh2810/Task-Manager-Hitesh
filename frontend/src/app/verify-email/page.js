"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";

function VerifyEmailContent() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email },
  });

  async function onSubmit(values) {
    await authService.verifyEmail(values);
    toast.success("Email verified");
  }

  return (
    <AuthShell title="Verify email" subtitle="Enter the six digit OTP to activate your account." switchText="Already verified?" switchHref="/login" switchLabel="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" error={errors.email}><Input {...register("email", { required: "Email is required" })} /></Field>
        <Field label="OTP" error={errors.otp}><Input placeholder="123456" {...register("otp", { required: "OTP is required" })} /></Field>
        <Button className="w-full" disabled={isSubmitting}>Verify email</Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => toast.promise(authService.resendVerification({ email }), { loading: "Sending OTP...", success: "OTP sent", error: "Enter email and try again" })}
        >
          Resend OTP
        </Button>
      </form>
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
