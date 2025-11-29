"use client";

import * as React from "react";

import useLogout from "@/hooks/useLogout";
import { REFRESH_TOKEN_ERROR, ROUTES } from "@/lib/constants";

import { useSession } from "./providers/SessionProvider";

interface Props {
  children?: React.ReactNode;
}

export default function CheckAuth({ children }: Props) {
  const { data: session } = useSession();
  const { logoutHandler } = useLogout();
  const sessionError = session?.error;
  React.useEffect(() => {
    if (sessionError === REFRESH_TOKEN_ERROR) {
      void logoutHandler({ redirectTo: ROUTES.landing, redirect: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionError]);

  return children;
}
