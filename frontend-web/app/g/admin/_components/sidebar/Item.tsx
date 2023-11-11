"use client";

import * as React from "react";

import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import LinkButton from "@/components/ui/LinkButton";
import { cn } from "@/lib/utils";

export interface ItemProps {
  href: LinkProps["href"];
  children: React.ReactNode;
}

export default function AdminSidebarItem({
  href,
  children,
  icon,
}: ItemProps & { icon: React.ReactNode }) {
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
    >
      <div className="flex items-center gap-2 capitalize">
        {icon}
        {children}
      </div>
    </LinkButton>
  );
}
