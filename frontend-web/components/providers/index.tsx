"use client";

import * as React from "react";

import { SessionProvider } from "next-auth/react";

import CheckAuth from "../CheckAuth";
import { ApolloProvider } from "./ApolloProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ApolloProvider>
          <CheckAuth>{children}</CheckAuth>
        </ApolloProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
