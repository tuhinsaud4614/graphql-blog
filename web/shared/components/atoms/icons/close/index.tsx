import * as React from "react";

import { IconVariant } from "@/lib/types";

const SvgComponent = (
  {
    variant = "normal",
    ...props
  }: React.SVGProps<SVGSVGElement> & {
    size?: number;
    variant?: IconVariant;
  },
  ref: React.Ref<SVGSVGElement>
) => {
  let stroke = "text-foreground";
  if (variant === "primary") {
    stroke = "text-primary";
  } else if (variant === "success") {
    stroke = "text-chart-2";
  } else if (variant === "info") {
    stroke = "text-chart-1";
  } else if (variant === "warning") {
    stroke = "text-chart-3";
  } else if (variant === "error") {
    stroke = "text-destructive";
  } else if (variant === "alternate") {
    stroke = "text-alternate";
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 500}
      height={props.size || 500}
      fill="none"
      ref={ref}
      viewBox="0 0 500 500"
      {...props}
    >
      <path
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={62.5}
        d="m406.25 93.75-312.5 312.5M93.75 93.75l312.5 312.5"
      />
    </svg>
  );
};
const CloseIcon = React.forwardRef(SvgComponent);
export default CloseIcon;
