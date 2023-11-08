"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";

import AuthLayout from "./_components/AuthLayout";
import VerifyAccountLayout from "./verify/_components/VerifyAccountLayout";

interface Props {
  children: React.ReactNode;
}

const VERIFICATION_ROUTES: string[] = [
  ROUTES.account.userVerify,
  ROUTES.account.verifyPasswordReset,
];

export default function AccountLayout({ children }: Props) {
  const pathname = usePathname();

  if (VERIFICATION_ROUTES.includes(pathname)) {
    return (
      <VerifyAccountLayout
        hideUserAvatar={pathname === ROUTES.account.userVerify}
      >
        {children}
      </VerifyAccountLayout>
    );
  }

  return <AuthLayout>{children}</AuthLayout>;
}
