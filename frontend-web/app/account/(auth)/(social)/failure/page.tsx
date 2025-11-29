"use client";

import { CircleXIcon } from "lucide-react";

import { LinkTextButton } from "@/components";
import { useSocialAuthFailure } from "@/hooks/useSocialAuth";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  useSocialAuthFailure();
  return (
    <section className="container flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 lg:p-6">
      <CircleXIcon
        absoluteStrokeWidth
        className="text-destructive size-20 md:size-32"
        strokeWidth={1.25}
      />
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="text-destructive space-y-2 text-center">
          <h2 className="font-IBM text-destructive pb-2 text-3xl font-semibold tracking-tight">
            Failed to sign in
          </h2>
          <p className="text-xl tracking-tight text-muted-foreground">
            Redirecting you to login page
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <LinkTextButton
              href={ROUTES.account.login}
              className="mx-auto w-fit"
            >
              Login
            </LinkTextButton>
          </div>
        </div>
      </div>
    </section>
  );
}
