import * as React from "react";

import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import CheckAuth from "../CheckAuth";
import { ApolloProvider } from "./ApolloProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

export default async function Providers({ children }: Readonly<Props>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ApolloProvider>
          <CheckAuth>{children}</CheckAuth>
        </ApolloProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
