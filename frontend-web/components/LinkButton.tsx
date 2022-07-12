import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, ReactNode } from "react";

const className =
  "outline-none border-0 px-4 py-2 rounded-full text-center inline-block bg-accent hover:bg-accent-focus text-base-200 hover:text-base-100 active:scale-95";

interface Props extends LinkProps {
  children?: ReactNode;
  className?: string;
  anchorProps?: Omit<HTMLAttributes<HTMLAnchorElement>, "className">;
}

export default function LinkButton({
  children,
  className: cls,
  anchorProps,
  ...rest
}: Props) {
  return (
    <Link {...rest}>
      <a {...anchorProps} className={classNames(className, cls)}>
        {children}
      </a>
    </Link>
  );
}
