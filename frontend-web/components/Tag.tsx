import * as React from "react";

import Link from "next/link";

import { cn } from "@/utils";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function Tag({ href, className, children }: Props) {
  return (
    <Link href={href} passHref>
      <a
        className={cn(
          "inline-block rounded border px-4 py-1.5 text-sm capitalize text-neutral/75 active:scale-95 dark:border-base-dark-300 dark:text-neutral-dark/75",
          className,
        )}
      >
        {children}
      </a>
    </Link>
  );
}
