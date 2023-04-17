import * as React from "react";

import classNames from "classnames";

interface Props extends React.ComponentPropsWithoutRef<"label"> {
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
        valid
          ? "text-neutral dark:text-neutral-dark"
          : "text-error dark:text-error-dark",
        rest.className,
      )}
    >
      {children}
      {required && (
        <sup className="text-xs text-error dark:text-error-dark">*</sup>
      )}
    </label>
  );
}
