"use client";

import * as React from "react";

import { signOut, useSession } from "next-auth/react";

import { REFRESH_TOKEN_ERROR, ROUTES } from "@/lib/constants";

interface Props {
  children?: React.ReactNode;
}

export default function CheckAuth({ children }: Props) {
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (
      status !== "loading" &&
      session?.error &&
      session.error === REFRESH_TOKEN_ERROR
    ) {
      void signOut({ callbackUrl: ROUTES.landing, redirect: true });
    }
  }, [session, status]);

  return children;
}
