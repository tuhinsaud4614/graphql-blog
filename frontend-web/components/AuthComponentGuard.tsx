"use client";

import * as React from "react";

import { useSession } from "next-auth/react";

import { UserRole } from "@/graphql/generated/schema";

interface Props {
  role?: UserRole | UserRole[];
  children?: React.ReactNode;
  loader?: React.ReactNode;
}

export default function AuthComponentGuard({ role, children, loader }: Props) {
  const { status, data } = useSession();

  if (status === "loading") {
    return loader;
  }

  const user = data?.user;

  if (!user) {
    return null;
  }

  if (
    role &&
    (Array.isArray(role) ? !(user.role in role) : user.role !== role)
  ) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
