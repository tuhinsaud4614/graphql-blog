import classNames from "classnames";
import { useRouter } from "next/router";

import { LinkButton } from "@component";
import type { ItemProps } from "./Item";

export default function ListItem({ href, children }: ItemProps) {
  const { pathname } = useRouter();
  const active = pathname === href;

  return (
    <LinkButton
      className={classNames(
        "!justify-start",
        active && "capitalize !text-base-100",
      )}
      mode="text"
      href={href}
      passHref
    >
      <span
        className={classNames(
          "ml-2.5 mr-4 h-1 w-1 rounded-full",
          active ? "ring ring-base-100/40" : "bg-current",
        )}
      />
      {children}
    </LinkButton>
  );
}
