import * as React from "react";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ className, children }: Props) {
  return (
    <h1 className={cn("text-3xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  );
}
