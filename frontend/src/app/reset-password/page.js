"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/auth-shell";
import { Field, PasswordInput } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";

export default function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    await authService.resetPassword(values);
    toast.success("Password reset complete");
  }

  return (
    <AuthShell title="Set new password" subtitle="Use the OTP from your email or Django terminal." switchText="Ready to sign in?" switchHref="/login" switchLabel="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" error={errors.email}><Input {...register("email", { required: "Email is required" })} /></Field>
        <Field label="OTP" error={errors.otp}><Input {...register("otp", { required: "OTP is required" })} /></Field>
        <Field label="New password" error={errors.new_password}><PasswordInput register={register} name="new_password" placeholder="New password" error={errors.new_password} /></Field>
        <Button className="w-full" disabled={isSubmitting}>Reset password</Button>
      </form>
    </AuthShell>
  );
}
