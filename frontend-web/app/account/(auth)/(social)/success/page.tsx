"use client";

import * as React from "react";

import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

import { LinkTextButton } from "@/components";
import { useSocialAuthSuccess } from "@/hooks/useSocialAuth";
import { ROUTES } from "@/lib/constants";

export default function SocialAuthSuccessPage() {
  const { isError } = useSocialAuthSuccess();

  let content: React.JSX.Element | null = (
    <>
      <UseAnimations
        animation={loading2}
        size={100}
        autoplay
        loop
        className="text-primary"
        fillColor="currentColor"
      />
      <div className="space-y-2 text-center">
        <h2 className="font-IBM pb-2 text-3xl font-semibold tracking-tight text-primary">
          Signing you in...
        </h2>
        <p className="text-xl font-medium tracking-tight text-muted-foreground">
          We&apos;re working hard to get you logged in as quickly as possible.
        </p>
      </div>
    </>
  );

  if (isError) {
    content = (
      <div className="text-destructive space-y-2 text-center">
        <h2 className="font-IBM text-destructive pb-2 text-3xl font-semibold tracking-tight">
          Failed to sign in
        </h2>
        <p className="text-xl tracking-tight text-muted-foreground">
          Redirecting you to login page
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <LinkTextButton href={ROUTES.account.login} className="mx-auto w-fit">
            Login
          </LinkTextButton>
        </div>
      </div>
    );
  }

  return (
    <section className="container flex min-h-screen items-center justify-center bg-background p-4 lg:p-6">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {content}
      </div>
    </section>
  );
}
