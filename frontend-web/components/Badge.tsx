import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils";

const variants = cva(
  "inline-flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none ring-2 ring-base-100 dark:ring-base-dark-100",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-base-100 dark:bg-primary-dark dark:text-black/[87%]",
        secondary:
          "bg-secondary text-base-100 dark:bg-secondary-dark dark:text-black/[87%]",
        error:
          "bg-error text-base-100 dark:bg-error-dark dark:text-base-100/[87%]",
        success:
          "bg-warning text-base-100 dark:bg-warning-dark dark:text-black/[87%]",
        warning: "bg-info text-info-foreground hover:bg-info/90",
        info: "bg-info text-base-100 dark:bg-info-dark dark:text-black/[87%]",
        neutral:
          "bg-neutral text-base-100 dark:bg-neutral-dark dark:text-black/[87%]",
        accent:
          "bg-accent text-neutral dark:bg-accent-dark dark:text-black/[87%]",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  },
);

interface Props extends VariantProps<typeof variants> {
  float?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Badge({
  children,
  variant,
  float = true,
  className,
}: Props) {
  return (
    <span
      className={cn(
        variants({ variant, className }),
        float && "absolute right-0 top-0 -translate-y-1/2 translate-x-1/2",
      )}
    >
      {children}
    </span>
  );
}
