"use client";

import * as React from "react";

import type { LinkProps } from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export interface ItemProps {
  href: LinkProps["href"];
  children: React.ReactNode;
  onClick?(): void;
}

export default function AdminSidebarItem({
  href,
  children,
  icon,
  onClick,
}: ItemProps & { icon: React.ReactNode }) {
  const matches = useMediaQuery("(min-width: 1280px)");
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <li>
      <Link
        className={cn(
          "flex items-center px-4 py-1.5 no-underline",
          active
            ? "bg-base-100/[8%] text-base-100 dark:bg-neutral/[8%] dark:text-secondary"
            : "text-base-100/75 hover:bg-base-100/[8%] hover:text-base-100 dark:text-secondary-content dark:hover:bg-neutral-100/[8%] dark:hover:text-secondary",
        )}
        href={href}
        onClick={matches ? undefined : onClick}
      >
        <div className="flex items-center gap-2 capitalize">
          {icon}
          {children}
        </div>
      </Link>
    </li>
  );
}
