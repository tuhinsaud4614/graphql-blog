import { ColorVariantType } from "@types";
import classNames from "classnames";
import { ReactNode } from "react";

const className = (variant: ColorVariantType) => {
  switch (variant) {
    case "primary":
      return "bg-primary text-base-100 dark:bg-primary-dark dark:text-black/[87%]";
    case "secondary":
      return "bg-secondary text-base-100 dark:bg-secondary-dark dark:text-black/[87%]";
    case "error":
      return "bg-error text-base-100 dark:bg-error-dark dark:text-base-100/[87%]";
    case "success":
      return "bg-success text-base-100 dark:bg-success-dark dark:text-black/[87%]";
    case "warning":
      return "bg-warning text-base-100 dark:bg-warning-dark dark:text-black/[87%]";
    case "info":
      return "bg-info text-base-100 dark:bg-info-dark dark:text-black/[87%]";
    case "neutral":
      return "bg-neutral text-base-100 dark:bg-neutral-dark dark:text-black/[87%]";
    default:
      return "bg-accent text-neutral dark:bg-accent-dark dark:text-black/[87%]";
  }
};

interface Props {
  variant?: ColorVariantType;
  float?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Badge({
  children,
  variant = "accent",
  float = true,
  className: cls,
}: Props) {
  return (
    <span
      className={classNames(
        "inline-flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none ring-2 ring-base-100 dark:ring-base-dark-100",
        className(variant),
        float && "absolute right-0 top-0 -translate-y-1/2 translate-x-1/2",
        cls,
      )}
    >
      {children}
    </span>
  );
}
