"use client";

import * as React from "react";

import AccordionProvider from "./context";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
}

export default function Accordion({ expanded, children, ...rest }: Props) {
  return (
    <div {...rest}>
      <AccordionProvider defaultValue={expanded}>{children}</AccordionProvider>
    </div>
  );
}
