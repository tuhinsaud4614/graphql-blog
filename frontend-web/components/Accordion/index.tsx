import * as React from "react";

import { AccordionProvider } from "./context";

export default function Accordion({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest}>
      <AccordionProvider>{children}</AccordionProvider>
    </div>
  );
}
