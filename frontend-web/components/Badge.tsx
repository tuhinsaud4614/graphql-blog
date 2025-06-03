import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";


const variants = cva(
  "dark:ring-base-dark-100 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none ring-2 ring-base-100",
  {
    variants: {
      variant: {
        primary:
          "dark:bg-primary-dark bg-primary text-base-100 dark:text-black/[87%]",
        secondary:
          "dark:bg-secondary-dark bg-secondary text-base-100 dark:text-black/[87%]",
        error:
          "dark:bg-error-dark bg-error text-base-100 dark:text-base-100/[87%]",
        success:
          "dark:bg-success-dark bg-success text-base-100 dark:text-black/[87%]",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        info: "dark:bg-info-dark bg-info text-base-100 dark:text-black/[87%]",
        neutral:
          "dark:bg-neutral-dark bg-neutral text-base-100 dark:text-black/[87%]",
        accent:
          "dark:bg-accent-dark bg-accent text-neutral dark:text-black/[87%]",
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
}: Readonly<Props>) {
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
