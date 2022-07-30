import { ButtonModeType, ColorVariantType } from "@types";
import classNames from "classnames";
import { ComponentPropsWithRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import { buttonClassName } from "./util";

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
    buttonClassName.fill,
    !rest.disabled && buttonClassName.fillEnabled
  );
  if (mode === "outline") {
    style = "border";
  } else if (mode === "text") {
    style = buttonClassName.text;
  }
  return (
    <button
      {...rest}
      className={classNames(
        buttonClassName.root,
        rest.disabled
          ? buttonClassName.disabled(mode)
          : buttonClassName.dynamic(variant, mode),
        style,
        loading && buttonClassName.loading,
        rest.className
      )}
    >
      {children}
      {loading && <ImSpinner2 className={buttonClassName.spin} />}
    </button>
  );
}
