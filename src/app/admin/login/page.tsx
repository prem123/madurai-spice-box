"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock, Loader2 } from "lucide-react";
import { login, type LoginState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {}
  );
  const from = useSearchParams().get("from") ?? "/admin";

  return (
    <form action={formAction} className="mt-7 space-y-4">
      <input type="hidden" name="from" value={from} />
      <div>
        <Label htmlFor="password">Admin Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoFocus
          required
          placeholder="Enter your password"
          className="mt-1.5"
        />
      </div>
      {state.error && (
        <p className="rounded-lg bg-chilli/10 px-3 py-2 text-sm text-chilli">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> Sign In
          </>
        )}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient spice-texture px-5">
      <div className="w-full max-w-sm rounded-3xl border border-brand-100 bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand/logo.webp"
            alt="Madurai Spice Box"
            width={56}
            height={56}
            className="rounded-full"
          />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-brand-800">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your inventory
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
