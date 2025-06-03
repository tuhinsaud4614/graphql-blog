"use client";

import * as React from "react";



import NewPostContextProvider from "../../../_context/post-context";

interface Props {
  children?: React.ReactNode;
}

export default function NewPostProviders({ children }: Readonly<Props>) {
  return (
    <NewPostContextProvider>
      {children}
    </NewPostContextProvider>
  );
}
