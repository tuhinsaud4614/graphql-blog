"use client";

import * as React from "react";

import { useSession } from "next-auth/react";

import { IAuthUser } from "@/lib/types";

interface Props {
  /** When the user is `Authenticated`, display this component. */
  auth: ((user?: IAuthUser) => React.ReactNode) | React.ReactNode;
  /** When the user is `Unauthenticated`, display this component. */
  unAuth: React.ReactNode;
  /** Load this component while checking if the user is `authenticated` or not. */
  loader?: React.ReactNode;
}

/** This is used to determine which component should be rendered based on whether the user is `authenticated` or `not`. */
export default function AuthSwitch({ auth, unAuth, loader }: Props) {
  const { status, data } = useSession();

  switch (status) {
    case "authenticated":
      if (typeof auth === "function") {
        return auth(data.user);
      }
      return auth;
    case "unauthenticated":
      return unAuth;
    case "loading":
      return loader;

    default:
      return null;
  }
}
