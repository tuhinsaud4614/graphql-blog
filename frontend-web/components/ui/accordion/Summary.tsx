"use client";

import * as React from "react";

import Button from "../Button";
import { useAccordion } from "./hooks";

interface Props {
  expandIcon?: React.ReactNode | ((isExpanded: boolean) => React.ReactNode);
}

export default function AccordionSummary({
  children,
  expandIcon,
  ...rest
}: Props & Omit<Parameters<typeof Button>["0"], "onClick">) {
  const { isExpanded, setIsExpanded } = useAccordion();

  return (
    <Button
      {...rest}
      onClick={() => {
        setIsExpanded?.((prev) => !prev);
      }}
    >
      <span>{children}</span>
      {typeof expandIcon === "function" ? expandIcon(isExpanded) : expandIcon}
    </Button>
  );
}
