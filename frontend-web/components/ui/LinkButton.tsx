"use client";

import * as React from "react";

import Link, { LinkProps } from "next/link";

import STYLES from "@/lib/styles";
import { ButtonModeType, ColorVariantType } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  let style = cn(STYLES.btn.fill, STYLES.btn.fillEnabled);
  if (mode === "outline") {
    style = "border";
  } else if (mode === "text") {
    style = STYLES.btn.text;
  }
  return (
    <Link {...rest}>
      <a
        {...anchorProps}
        className={cn(
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
