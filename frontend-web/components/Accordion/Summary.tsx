import * as React from "react";

import { Button } from "@component";
import { useAccordionStore } from "./context";

interface Props {
  expandIcon?: React.ReactNode | ((expand: boolean) => React.ReactNode);
}

export default function Summary({
  children,
  expandIcon,
  onClick,
  ...rest
}: Props & Parameters<typeof Button>["0"]) {
  const [expanded, setExpanded] = useAccordionStore((state) => state.expand);
  return (
    <Button
      {...rest}
      onClick={() => {
        setExpanded({ expand: !expanded });
      }}
    >
      <span>{children}</span>
      {typeof expandIcon === "function" ? expandIcon(expanded) : expandIcon}
    </Button>
  );
}
