"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";

import LandingLayout from "../(landing)/_components/LandingLayout";

interface Props {
  children: React.ReactNode;
}

export default function DynamicLayout({ children }: Props) {
  const pathname = usePathname();

  if (pathname === ROUTES.landing) {
    return <LandingLayout>{children}</LandingLayout>;
  }
  return children;
}
