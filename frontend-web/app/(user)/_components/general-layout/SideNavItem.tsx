"use client";

import * as React from "react";

import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

interface Props extends LinkProps {
  active?: boolean;
  className?: string;
  parentClassName?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
}

export default function SideNavItem({
  children,
  active,
  className,
  parentClassName,
  ...rest
}: Props) {
  return (
    <li className={cn("w-full pb-8", parentClassName)}>
      <Link
        {...rest}
        className={cn(
          "flex w-full items-center justify-center active:scale-95",
          active ? "text-secondary" : "text-neutral hover:text-secondary",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
}
