"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  {
    className,
    children,
    ...rest
  }: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-base-200 dark:hover:bg-base-100",
        className,
      )}
    >
      {children}
    </button>
  );
}

const MenuItem = React.forwardRef(Root);
export default MenuItem;
