"use client";

import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variants = cva(
  "inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none ring-2 ring-base-100",
  {
    variants: {
      variant: {
        primary: "bg-primary text-base-100 dark:text-black/[87%]",
        secondary: "bg-secondary text-base-100 dark:text-black/[87%]",
        error: "bg-error text-base-100 dark:text-base-100/[87%]",
        success: "bg-warning text-base-100 dark:text-black/[87%]",
        warning: "bg-info text-base-100 hover:bg-info/90",
        info: "bg-info text-neutral dark:text-black/[87%]",
        neutral: "bg-neutral text-base-100 dark:text-black/[87%]",
        accent: "bg-accent text-neutral dark:text-black/[87%]",
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
