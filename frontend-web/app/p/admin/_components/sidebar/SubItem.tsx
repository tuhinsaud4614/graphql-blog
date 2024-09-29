"use client";

import { usePathname } from "next/navigation";

import LinkButton from "@/components/ui/LinkButton";
import { cn } from "@/lib/utils";

import type { ItemProps } from "./Item";

export default function AdminSidebarSubItem({ href, children }: ItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <LinkButton
      className={cn("!justify-start", active && "capitalize !text-base-100")}
      mode="text"
      href={href}
    >
      <span
        className={cn(
          "ml-2.5 mr-4 h-1 w-1 rounded-full bg-current",
          active && "ring ring-base-100/40",
        )}
      />
      {children}
    </LinkButton>
  );
}
