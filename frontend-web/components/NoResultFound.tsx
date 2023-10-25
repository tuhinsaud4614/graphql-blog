"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  classes?: { root?: string; title?: string };
}

export default function NoResultFound({ children, classes }: Props) {
  return (
    <div
      className={cn("flex flex-col items-center py-[1.875rem]", classes?.root)}
    >
      <p
        className={cn(
          "mb-6 text-center text-sm font-normal text-neutral",
          classes?.title,
        )}
      >
        {children}
      </p>
    </div>
  );
}
