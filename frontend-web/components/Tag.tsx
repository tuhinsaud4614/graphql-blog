import * as React from "react";

import Link from "next/link";

import classNames from "classnames";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function Tag({ href, className, children }: Props) {
  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "rounded inline-block px-4 py-1.5 border dark:border-base-dark-300 text-sm text-neutral/75 dark:text-neutral-dark/75 active:scale-95 capitalize",
          className,
        )}
      >
        {children}
      </a>
    </Link>
  );
}
