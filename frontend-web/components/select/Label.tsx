import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"label"> {
  valid: boolean;
  required?: boolean;
}

export default function Label({
  valid,
  children,
  required = false,
  ...rest
}: Props) {
  return (
    <label
      {...rest}
      className={classNames(
        "mb-3 text-sm",
        valid ? "text-neutral" : "text-error",
        rest.className
      )}
    >
      {children}
      {required && <sup className="text-xs text-error">*</sup>}
    </label>
  );
}
