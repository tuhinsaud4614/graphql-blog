import { useRouter } from "next/router";

import { LinkButton } from "@/components";
import { cn } from "@/utils";

import type { ItemProps } from "./Item";

export default function SubItem({ href, children }: ItemProps) {
  const { pathname } = useRouter();
  const active = pathname === href;

  return (
    <LinkButton
      className={cn("!justify-start", active && "capitalize !text-base-100")}
      mode="text"
      href={href}
      passHref
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
