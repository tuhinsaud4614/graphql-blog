import classNames from "classnames";
import type { ComponentPropsWithRef } from "react";
import { ImSpinner2 } from "react-icons/im";

import STYLES from "@styles";
import { ButtonModeType, ColorVariantType } from "@types";

interface Props extends ComponentPropsWithRef<"button"> {
  mode?: ButtonModeType;
  variant?: ColorVariantType;
  loading?: boolean;
}

export default function Button({
  variant = "accent",
  mode = "fill",
  loading = false,
  children,
  ...rest
}: Props) {
  let style = classNames(
    STYLES.btn.fill,
    !rest.disabled && STYLES.btn.fillEnabled,
  );
  if (mode === "outline") {
    style = "border";
  } else if (mode === "text") {
    style = STYLES.btn.text;
  }
  return (
    <button
      {...rest}
      className={classNames(
        STYLES.btn.root,
        rest.disabled
          ? STYLES.btn.disabled(mode)
          : STYLES.btn.dynamic(variant, mode),
        style,
        loading && STYLES.btn.loading,
        rest.className,
      )}
    >
      {children}
      {loading && <ImSpinner2 className={STYLES.btn.spin} />}
    </button>
  );
}
