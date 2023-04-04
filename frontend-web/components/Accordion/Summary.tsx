import * as React from "react";

import { Button } from "@component";
import { useAccordionStore } from "./context";

interface Props {
  expanded?: boolean;
  expandIcon?: React.ReactNode | ((expand: boolean) => React.ReactNode);
}

export default function Summary({
  expanded = false,
  children,
  expandIcon,
  onClick,
  ...rest
}: Props & Parameters<typeof Button>["0"]) {
  const [expand, setExpand] = useAccordionStore((state) => state.expand);

  React.useEffect(() => {
    setExpand({ expand: expanded });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
