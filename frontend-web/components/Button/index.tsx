import * as React from "react";

import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/utils";
import STYLES from "@/utils/styles";
import { ButtonModeType, ColorVariantType } from "@/utils/types";

interface Props extends React.ComponentPropsWithRef<"button"> {
  mode?: ButtonModeType;
  variant?: ColorVariantType;
  loading?: boolean;
  circle?: boolean;
}

export default function Button({
  variant = "accent",
  mode = "fill",
  loading = false,
  circle = false,
  children,
  ...rest
}: Props) {
  let style = cn(STYLES.btn.fill, !rest.disabled && STYLES.btn.fillEnabled);
  if (mode === "outline") {
    style = "border";
  } else if (mode === "text") {
    style = STYLES.btn.text;
  }
  return (
    <button
      {...rest}
      className={cn(
        STYLES.btn.root,
        rest.disabled
          ? STYLES.btn.disabled(mode)
          : STYLES.btn.dynamic(variant, mode),
        style,
        loading && STYLES.btn.loading,
        circle && STYLES.btn.circle,
        rest.className,
      )}
    >
      {children}
      {loading && <ImSpinner2 className={STYLES.btn.spin} />}
    </button>
  );
}
