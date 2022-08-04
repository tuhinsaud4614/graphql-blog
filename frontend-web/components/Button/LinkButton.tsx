import { ButtonModeType, ColorVariantType } from "@types";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, ReactNode } from "react";
import { buttonClassName } from "./util";

interface Props extends LinkProps {
  children?: ReactNode;
  className?: string;
  anchorProps?: Omit<HTMLAttributes<HTMLAnchorElement>, "className">;
  mode?: ButtonModeType;
  variant?: ColorVariantType;
}

export default function LinkButton({
  children,
  anchorProps,
  variant = "accent",
  mode = "fill",
  ...rest
}: Props) {
  let style = classNames(buttonClassName.fill, buttonClassName.fillEnabled);
  if (mode === "outline") {
    style = "border";
  } else if (mode === "text") {
    style = buttonClassName.text;
  }
  return (
    <Link {...rest}>
      <a
        {...anchorProps}
        className={classNames(
          buttonClassName.root,
          buttonClassName.dynamic(variant, mode),
          style,
          rest.className
        )}
      >
        {children}
      </a>
    </Link>
  );
}
