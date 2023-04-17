import * as React from "react";

import Link, { LinkProps } from "next/link";

import classNames from "classnames";

import STYLES from "@/utils/styles";
import type { ButtonModeType, ColorVariantType } from "@/utils/types";

interface Props extends LinkProps {
  children?: React.ReactNode;
  className?: string;
  anchorProps?: Omit<React.HTMLAttributes<HTMLAnchorElement>, "className">;
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
