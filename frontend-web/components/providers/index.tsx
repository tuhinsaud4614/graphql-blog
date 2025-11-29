import * as React from "react";

import { ApolloProvider } from "./ApolloProvider";
import SessionProvider from "./SessionProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Readonly<Props>) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ApolloProvider>
          {/* <CheckAuth> */}
          {children}
          {/* </CheckAuth> */}
        </ApolloProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
