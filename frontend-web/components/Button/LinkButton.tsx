import STYLES from "@styles";
import { ButtonModeType, ColorVariantType } from "@types";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, ReactNode } from "react";

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
  let style = classNames(STYLES.btn.fill, STYLES.btn.fillEnabled);
  if (mode === "outline") {
    style = "border";
  } else if (mode === "text") {
    style = STYLES.btn.text;
  }
  return (
    <Link {...rest}>
      <a
        {...anchorProps}
        className={classNames(
          STYLES.btn.root,
          STYLES.btn.dynamic(variant, mode),
          style,
          rest.className,
        )}
      >
        {children}
      </a>
    </Link>
  );
}
