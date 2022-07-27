import { ColorVariantType } from "@types";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import { buttonClassName } from "./util";

interface Props extends LinkProps {
  children?: ReactNode;
  className?: string;
  anchorProps?: Omit<HTMLAttributes<HTMLAnchorElement>, "className">;
  outline?: boolean;
  variant?: ColorVariantType;
}

export default function LinkButton({
  children,
  anchorProps,
  variant = "accent",
  outline = false,
  ...rest
}: Props) {
  return (
    <Link {...rest}>
      <a
        {...anchorProps}
        className={classNames(
          buttonClassName.root,
          buttonClassName.dynamic(variant, outline),
          outline
            ? "border"
            : classNames(buttonClassName.fill, buttonClassName.fillEnabled),
          rest.className
        )}
      >
        {children}
      </a>
    </Link>
  );
}
