"use client";

import * as React from "react";

import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import LinkButton from "@/components/ui/LinkButton";
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
    <LinkButton
      className={cn(
        "!justify-start",
        active && "text-base-100 dark:text-neutral",
      )}
      mode="text"
      variant="secondary"
      href={href}
      onClick={matches ? undefined : onClick}
    >
      <div className="flex items-center gap-2 capitalize">
        {icon}
        {children}
      </div>
    </LinkButton>
  );
}
