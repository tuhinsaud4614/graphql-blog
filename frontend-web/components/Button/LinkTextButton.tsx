import * as React from "react";

import Link from "next/link";

import { cn } from "@/utils";

const className = {
  root: "text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success active:scale-95",
};

interface Props extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
}

export default function LinkTextButton({ href, children, ...rest }: Props) {
  return (
    <Link href={href} passHref>
      <a {...rest} className={cn(className.root, rest.className)}>
        {children}
      </a>
    </Link>
  );
}
