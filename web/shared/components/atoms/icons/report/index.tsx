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
  let fill = "text-background";
  if (variant === "primary") {
    fill = "text-primary";
  } else if (variant === "success") {
    fill = "text-chart-2";
  } else if (variant === "info") {
    fill = "text-chart-1";
  } else if (variant === "warning") {
    fill = "text-chart-3";
  } else if (variant === "error") {
    fill = "text-destructive";
  } else if (variant === "alternate") {
    fill = "text-alternate";
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
        className={fill}
        fill="currentColor"
        d="m406.25 328.132 15.625-250.003s-93.75 46.879-203.125.002c-109.375-46.877-187.5 0-187.5 0L62.5 316.548c31.25-19.669 88.383-21.462 187.5 11.581 99.119 33.044 156.25.003 156.25.003Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M31.25 78.129s62.5-62.499 187.5 0c125 62.497 218.75-.003 218.75-.003l-15.625 250s-78.125 46.875-171.875 0-156.25-31.25-187.5-15.625"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="M31.25 46.875 78.125 468.75"
      />
    </svg>
  );
};
const ReportIcon = React.forwardRef(SvgComponent);
export default ReportIcon;
