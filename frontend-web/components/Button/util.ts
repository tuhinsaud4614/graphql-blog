import { ButtonModeType, ColorVariantType } from "@types";
import classNames from "classnames";

const className = {
  root: "px-4 py-1.5 rounded-full select-none active:scale-95",
  fill: "outline-none border-0",
  fillEnabled: "shadow-mui hover:shadow-mui-hover active:shadow-mui-active",
  text: "outline-none border-0 bg-transparent select-none rounded",
  loading: "flex items-center justify-center",
  spin: "text-inherit animate-spin ml-2 text-sm",
  disabled(mode: ButtonModeType = "outline") {
    let style = "disabled:border-black/[12%] dark:disabled:border-white/[12%]";
    if (mode === "fill") {
      style = "disabled:bg-black/[12%] dark:disabled:bg-white/[12%]";
    }
    return classNames(
      "disabled:text-black/[26%] dark:disabled:text-white/[26%] disabled:cursor-not-allowed disabled:pointer-events-none",
      style
    );
  },
  dynamic(variant: ColorVariantType, mode: ButtonModeType = "outline") {
    switch (variant) {
      case "primary":
        if (mode === "outline") {
          return "border-primary/50 text-primary hover:border-primary hover:bg-primary/5 dark:text-primary-content dark:border-primary-content/50 dark:hover:bg-primary-content/[8%] dark:hover:border-primary-content";
        }
        if (mode === "text") {
          return "text-primary hover:bg-primary/5 dark:text-primary-content dark:hover:bg-primary-content/[8%]";
        }
        return "bg-primary hover:bg-primary-focus text-base-100 dark:bg-primary-dark dark:hover:bg-primary dark:text-black/[87%]";
      case "secondary":
        if (mode === "outline") {
          return "border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/5 dark:text-secondary-content dark:border-secondary-content/50 dark:hover:bg-secondary-content/[8%] dark:hover:border-secondary-content";
        }
        if (mode === "text") {
          return "text-secondary hover:bg-secondary/5 dark:text-secondary-content dark:hover:bg-secondary-content/[8%]";
        }
        return "bg-secondary hover:bg-secondary-focus text-base-100 dark:bg-secondary-dark dark:hover:bg-secondary dark:text-black/[87%]";
      case "error":
        if (mode === "outline") {
          return "border-error/50 text-error hover:border-error hover:bg-error/5 dark:text-error-content dark:border-error-content/50 dark:hover:bg-error-content/[8%] dark:hover:border-error-content";
        }
        if (mode === "text") {
          return "text-error hover:bg-error/5 dark:text-error-content dark:hover:bg-error-content/[8%]";
        }
        return "bg-error hover:bg-error-focus text-base-100 dark:bg-error-dark dark:hover:bg-error dark:text-base-100/[87%]";
      case "success":
        if (mode === "outline") {
          return "border-success/50 text-success hover:border-success hover:bg-success/5 dark:text-success-content dark:border-success-content/50 dark:hover:bg-success-content/[8%] dark:hover:border-success-content";
        }
        if (mode === "text") {
          return "text-success hover:bg-success/5 dark:text-success-content dark:hover:bg-success-content/[8%]";
        }
        return "bg-success hover:bg-success-focus text-base-100 dark:bg-success-dark dark:hover:bg-success dark:text-black/[87%]";
      case "warning":
        if (mode === "outline") {
          return "border-warning/50 text-warning hover:border-warning hover:bg-warning/5 dark:text-warning-content dark:border-warning-content/50 dark:hover:bg-warning-content/[8%] dark:hover:border-warning-content";
        }
        if (mode === "text") {
          return "text-warning hover:bg-warning/5 dark:text-warning-content dark:hover:bg-warning-content/[8%]";
        }
        return "bg-warning hover:bg-warning-focus text-neutral dark:bg-warning-dark dark:hover:bg-warning dark:text-black/[87%]";
      case "info":
        if (mode === "outline") {
          return "border-info/50 text-info hover:border-info hover:bg-info/5 dark:text-info-content dark:border-info-content/50 dark:hover:bg-info-content/[8%] dark:hover:border-info-content";
        }
        if (mode === "text") {
          return "text-info hover:bg-info/5 dark:text-info-content dark:hover:bg-info-content/[8%]";
        }
        return "bg-info hover:bg-info-focus text-base-100 dark:bg-info-dark dark:hover:bg-info dark:text-black/[87%]";
      case "neutral":
        if (mode === "outline") {
          return "border-neutral/50 text-neutral hover:border-neutral hover:bg-neutral/5 dark:text-neutral-dark dark:border-neutral-dark/50 dark:hover:bg-neutral-dark/[8%] dark:hover:border-neutral-dark";
        }
        if (mode === "text") {
          return "text-neutral hover:bg-neutral/5 dark:text-neutral-dark dark:hover:bg-neutral-dark/[8%]";
        }
        return "bg-neutral hover:bg-neutral-focus text-base-100 dark:bg-neutral-dark dark:hover:bg-neutral-dark-focus dark:text-black/[87%]";
      default:
        if (mode === "outline") {
          return "border-accent/50 text-accent hover:border-accent hover:bg-accent/5 dark:text-accent-content dark:border-accent-content/50 dark:hover:bg-accent-content/[8%] dark:hover:border-accent-content";
        }
        if (mode === "text") {
          return "text-accent hover:bg-accent/5 dark:text-accent-content dark:hover:bg-accent-content/[8%]";
        }
        return "bg-accent hover:bg-accent-focus text-neutral dark:bg-accent-dark dark:hover:bg-accent dark:text-black/[87%]";
    }
  },
};

export { className as buttonClassName };
