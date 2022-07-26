import { ColorVariantType } from "@types";
import classNames from "classnames";
import { ComponentPropsWithRef } from "react";
import { ImSpinner2 } from "react-icons/im";

const className = {
  root: "px-4 py-1.5 rounded-full select-none enabled:active:scale-95",
  fill: "outline-none border-0 enabled:shadow-mui enabled:hover:shadow-mui-hover enabled:active:shadow-mui-active",
  loading: "flex items-center justify-center",
  spin: "text-white animate-spin ml-2 text-sm",
  disabled(outline = false) {
    return classNames(
      "disabled:text-black/[26%] dark:disabled:text-white/[3%] disabled:cursor-not-allowed disabled:pointer-events-none",
      outline
        ? "disabled:border-black/[12%] dark:disabled:border-white/[12%]"
        : "disabled:bg-black/[12%] dark:disabled:bg-white/[12%]"
    );
  },
  dynamic(variant: ColorVariantType, outline = false) {
    switch (variant) {
      case "primary":
        if (outline) {
          return "border-primary/50 text-primary hover:border-primary hover:bg-primary/5 dark:text-primary-content dark:border-primary-content/50 dark:hover:bg-primary-content/[8%] dark:hover:border-primary-content";
        }
        return "bg-primary hover:bg-primary-focus text-base-100 dark:bg-primary-dark dark:hover:bg-primary dark:text-black/[87%]";
      case "secondary":
        if (outline) {
          return "border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/5 dark:text-secondary-content dark:border-secondary-content/50 dark:hover:bg-secondary-content/[8%] dark:hover:border-secondary-content";
        }
        return "bg-secondary hover:bg-secondary-focus text-base-100 dark:bg-secondary-dark dark:hover:bg-secondary dark:text-black/[87%]";
      case "error":
        if (outline) {
          return "border-error/50 text-error hover:border-error hover:bg-error/5 dark:text-error-content dark:border-error-content/50 dark:hover:bg-error-content/[8%] dark:hover:border-error-content";
        }
        return "bg-error hover:bg-error-focus text-base-100 dark:bg-error-dark dark:hover:bg-error dark:text-black/[87%]";
      case "success":
        if (outline) {
          return "border-success/50 text-success hover:border-success hover:bg-success/5 dark:text-success-content dark:border-success-content/50 dark:hover:bg-success-content/[8%] dark:hover:border-success-content";
        }
        return "bg-success hover:bg-success-focus text-base-100 dark:bg-success-dark dark:hover:bg-success dark:text-black/[87%]";
      case "warning":
        if (outline) {
          return "border-warning/50 text-warning hover:border-warning hover:bg-warning/5 dark:text-warning-content dark:border-warning-content/50 dark:hover:bg-warning-content/[8%] dark:hover:border-warning-content";
        }
        return "bg-warning hover:bg-warning-focus text-base-100 dark:bg-warning-dark dark:hover:bg-warning dark:text-black/[87%]";
      case "info":
        if (outline) {
          return "border-info/50 text-info hover:border-info hover:bg-info/5 dark:text-info-content dark:border-info-content/50 dark:hover:bg-info-content/[8%] dark:hover:border-info-content";
        }
        return "bg-info hover:bg-info-focus text-base-100 dark:bg-info-dark dark:hover:bg-info dark:text-black/[87%]";
      default:
        if (outline) {
          return "border-accent/50 text-accent hover:border-accent hover:bg-accent/5 dark:text-accent-content dark:border-accent-content/50 dark:hover:bg-accent-content/[8%] dark:hover:border-accent-content";
        }
        return "bg-accent hover:bg-accent-focus text-neutral dark:bg-accent-dark dark:hover:bg-accent dark:text-black/[87%]";
    }
  },
};

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
        className.root,
        rest.disabled
          ? className.disabled(outline)
          : className.dynamic(variant, outline),
        outline ? "border" : className.fill,
        loading && className.loading,
        rest.className
      )}
    >
      {children}
      {loading && <ImSpinner2 className={className.spin} />}
    </button>
  );
}
