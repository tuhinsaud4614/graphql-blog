import * as React from "react";

import { Button } from "@/components";

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
  const [expand, setExpand] = useAccordionStore((state) => state.expand);

  return (
    <Button
      {...rest}
      onClick={() => {
        setExpand({ expand: !expand });
      }}
    >
      <span>{children}</span>
      {typeof expandIcon === "function" ? expandIcon(expand) : expandIcon}
    </Button>
  );
}
