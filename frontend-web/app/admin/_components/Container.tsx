"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { useAdminDrawerControllerState } from "../_context-hooks/useDrawerController";

interface Props {
  children?: React.ReactNode;
}

export default function AdminLayoutContainer({ children }: Props) {
  const isOpen = useAdminDrawerControllerState();
  return (
    <div
      className={cn(
        "transition-[margin-left] duration-300 ease-in",
        isOpen ? "xl:ml-[17.5rem]" : "xl:ml-[5.375rem]",
      )}
    >
      {children}
    </div>
  );
}
