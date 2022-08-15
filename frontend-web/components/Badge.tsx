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
        "inline-flex justify-center items-center text-xs leading-none font-bold rounded-full border-2 border-white dark:border-base-dark-300 px-1.5 min-h-[1.5rem] min-w-[1.5rem]",
        className(variant),
        float && "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",
        cls
      )}
    >
      {children}
    </span>
  );
}
