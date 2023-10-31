"use client";

import * as React from "react";

import { SessionProvider } from "next-auth/react";

import { ApolloProvider } from "./ApolloProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ApolloProvider>{children}</ApolloProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
