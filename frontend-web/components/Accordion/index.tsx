import * as React from "react";

import { AccordionProvider } from "./context";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
}

export default function Accordion({ expanded, children, ...rest }: Props) {
  const defaultValue = expanded ? { expand: expanded } : undefined;
  return (
    <div {...rest}>
      <AccordionProvider defaultValue={defaultValue}>
        {children}
      </AccordionProvider>
    </div>
  );
}
