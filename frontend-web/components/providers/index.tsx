"use client";

import * as React from "react";

import { ApolloProvider } from "./ApolloProvider";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./context/authContext";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ApolloProvider>{children}</ApolloProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
