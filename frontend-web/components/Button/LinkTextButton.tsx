import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

const className = {
  root: "text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success active:scale-95",
};

interface Props extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
}

export default function LinkTextButton({
  href,
  children,
  ...rest
}: Readonly<Props>) {
  return (
    <Link href={href} {...rest} className={cn(className.root, rest.className)}>
      {children}
    </Link>
  );
}
