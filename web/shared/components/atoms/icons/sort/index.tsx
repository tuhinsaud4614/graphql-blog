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
        strokeWidth={50}
        d="M225 100h225M225 250h225M225 400h225M50 100h100M100 150V50"
      />
      <path
        className={stroke}
        fill="currentColor"
        d="M137.5 250c0 20.71-16.789 37.5-37.5 37.5-20.71 0-37.5-16.79-37.5-37.5 0-20.711 16.79-37.5 37.5-37.5 20.711 0 37.5 16.789 37.5 37.5ZM100 437.5c20.711 0 37.5-16.789 37.5-37.5s-16.789-37.5-37.5-37.5c-20.71 0-37.5 16.789-37.5 37.5s16.79 37.5 37.5 37.5Z"
      />
    </svg>
  );
};
const SortIcon = React.forwardRef(SvgComponent);
export default SortIcon;
