"use client";

import * as React from "react";

import { ThemeProvider as NextTheme } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  return (
    <NextTheme
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextTheme>
  );
}
