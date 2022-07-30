import classNames from "classnames";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

const className = {
  root: "text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success active:scale-95",
};

interface Props extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
}

export default function LinkTextButton({ href, children, ...rest }: Props) {
  return (
    <Link href={href} passHref>
      <a {...rest} className={classNames(className.root, rest.className)}>
        {children}
      </a>
    </Link>
  );
}
