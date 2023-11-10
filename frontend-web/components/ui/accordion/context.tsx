"use client";

import * as React from "react";

import { createContext } from "use-context-selector";

interface State {
  isExpanded: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccordionContext = createContext<State>({
  isExpanded: false,
});

interface Props {
  children?: React.ReactNode;
  defaultValue?: boolean;
}

export default function AccordionProvider({
  defaultValue = false,
  children,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(defaultValue);

  return (
    <AccordionContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </AccordionContext.Provider>
  );
}
