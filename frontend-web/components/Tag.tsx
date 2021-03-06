import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
}

export default function Tag({ href, className, children }: Props) {
  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "rounded inline-block px-4 py-1.5 border text-sm text-neutral/75 active:scale-95 capitalize",
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
}
