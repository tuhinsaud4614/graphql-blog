import * as React from "react";

import type { LinkProps } from "next/link";
import { useRouter } from "next/router";

import { LinkButton } from "@/components";
import { cn } from "@/utils";

export interface ItemProps {
  href: LinkProps["href"];
  children: React.ReactNode;
}

export default function Item({
  href,
  children,
  icon,
}: ItemProps & { icon: React.ReactNode }) {
  const { pathname } = useRouter();
  const active = pathname === href;

  return (
    <LinkButton
      className={cn("!justify-start", active && "!text-base-100")}
      mode="text"
      href={href}
      passHref
    >
      <div className="flex items-center gap-2 capitalize">
        {icon}
        {children}
      </div>
    </LinkButton>
  );
}
