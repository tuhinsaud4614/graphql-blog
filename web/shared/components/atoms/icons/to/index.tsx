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
  } else if (variant === "adaptive") {
    stroke = "";
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
        fill="currentColor"
        d="M406.25 267.969c9.925 0 17.969-8.045 17.969-17.969 0-9.924-8.044-17.969-17.969-17.969v35.938ZM234.375 250v17.969H406.25v-35.938H234.375V250Z"
      />
      <path
        className={stroke}
        stroke="currentColor"
        strokeWidth={35.938}
        d="M156.25 174.227c41.852 0 75.775 33.922 75.775 75.775 0 41.852-33.923 75.775-75.775 75.775-41.853 0-75.775-33.923-75.775-75.775 0-41.853 33.922-75.775 75.775-75.775Z"
      />
      <path
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="m328.125 156.25 93.75 93.75-93.75 93.75"
      />
    </svg>
  );
};
const ToIcon = React.forwardRef(SvgComponent);
export default ToIcon;
