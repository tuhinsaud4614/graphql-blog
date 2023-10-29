"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";

import AuthLayout from "./_components/AuthLayout";
import VerifyAccountLayout from "./verify/_components/VerifyAccountLayout";

interface Props {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: Props) {
  const pathname = usePathname();
  if (pathname === ROUTES.accountVerify) {
    return <VerifyAccountLayout>{children}</VerifyAccountLayout>;
  }

  return <AuthLayout>{children}</AuthLayout>;
}
