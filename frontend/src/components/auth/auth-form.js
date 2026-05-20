"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Field({ label, error, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-rose-400">{error.message || error}</span>}
    </label>
  );
}

export function PasswordInput({ register, name = "password", placeholder = "Password", error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} placeholder={placeholder} error={error} {...register(name)} />
      <button
        type="button"
        onClick={() => setShow((value) => !value)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
