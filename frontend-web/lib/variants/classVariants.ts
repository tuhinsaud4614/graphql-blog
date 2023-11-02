import { cva } from "class-variance-authority";

export const skeletonVariant = cva("animate-pulse", {
  variants: {
    variant: {
      neutral: "bg-neutral/20",
      "base-100": "bg-base-100/20",
    },
    shape: {
      round: "rounded-md",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});
