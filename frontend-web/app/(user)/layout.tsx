"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import LandingLayout from "./_components/landing/LandingLayout";

interface Props {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Props) {
  const pathname = usePathname();
  if (pathname === "/") {
    return <LandingLayout>{children}</LandingLayout>;
  }
  return children;
}
