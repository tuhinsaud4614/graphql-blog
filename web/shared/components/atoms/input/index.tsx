import * as React from "react";

import { cn } from "@/lib/utils";

export default function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-none transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "corner-squircle rounded-lg1 supports-squircle:rounded-[100px]",
        "focus-visible:border-foreground",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}
