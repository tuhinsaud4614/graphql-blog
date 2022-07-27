import { ColorVariantType } from "@types";
import classNames from "classnames";
import { ComponentPropsWithRef } from "react";
import { ImSpinner2 } from "react-icons/im";
import { buttonClassName } from "./util";

interface Props extends ComponentPropsWithRef<"button"> {
  outline?: boolean;
  variant?: ColorVariantType;
  loading?: boolean;
}

export default function Button({
  variant = "accent",
  outline = false,
  loading = false,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={classNames(
        buttonClassName.root,
        rest.disabled
          ? buttonClassName.disabled(outline)
          : buttonClassName.dynamic(variant, outline),
        outline
          ? "border"
          : classNames(
              buttonClassName.fill,
              !rest.disabled && buttonClassName.fillEnabled
            ),
        loading && buttonClassName.loading,
        rest.className
      )}
    >
      {children}
      {loading && <ImSpinner2 className={buttonClassName.spin} />}
    </button>
  );
}
