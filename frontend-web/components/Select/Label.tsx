import { cn } from "@/lib/utils";
import * as React from "react";


interface Props extends React.ComponentPropsWithoutRef<"label"> {
  valid: boolean;
  required?: boolean;
}

export default function Label({
  valid,
  children,
  required = false,
  ...rest
}: Readonly<Props>) {
  return (
    <label
      {...rest}
      className={cn(
        "mb-3 text-sm",
        valid
          ? "dark:text-neutral-dark text-neutral"
          : "dark:text-error-dark text-error",
        rest.className,
      )}
    >
      {children}
      {required && (
        <sup className="dark:text-error-dark text-xs text-error">*</sup>
      )}
    </label>
  );
}
