import * as React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function Tag({ href, className, children }: Props) {
  return (
    <Link href={href} 
        className={cn(
          "dark:border-base-dark-300 dark:text-neutral-dark/75 inline-block rounded border px-4 py-1.5 text-sm capitalize text-neutral/75 active:scale-95",
          className,
        )}
      >
        {children}
    </Link>
  );
}
