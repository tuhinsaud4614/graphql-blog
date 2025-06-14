"use client";

import * as React from "react";

import { createContext } from "use-context-selector";

export interface State {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminDrawerControllerContext = createContext<State>({
  isOpen: false,
});

export default function AdminDrawerControllerProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AdminDrawerControllerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AdminDrawerControllerContext.Provider>
  );
}
