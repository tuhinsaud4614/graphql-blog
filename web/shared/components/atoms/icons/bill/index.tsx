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
        stroke="var(--foreground)"
        strokeWidth={37.5}
        d="M31.25 125c0-34.518 27.982-62.5 62.5-62.5h312.5c34.519 0 62.5 27.982 62.5 62.5v250c0 34.519-27.981 62.5-62.5 62.5H93.75c-34.518 0-62.5-27.981-62.5-62.5V125Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M482.025 151.151v197.694c-.003 50.512-37.616 93.131-87.738 99.394a1163.213 1163.213 0 0 1-288.574 0c-50.123-6.263-87.736-48.882-87.738-99.394V151.151c.002-50.511 37.616-93.13 87.738-99.395a1163.348 1163.348 0 0 1 288.574 0c50.122 6.265 87.735 48.884 87.738 99.395Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M500 156.25H343.75c-51.777 0-93.75 41.973-93.75 93.75s41.973 93.75 93.75 93.75H500"
      />
      <path
        fill="var(--foreground)"
        d="M375 250c0-17.259-13.991-31.25-31.25-31.25S312.5 232.741 312.5 250s13.991 31.25 31.25 31.25S375 267.259 375 250Z"
      />
    </svg>
  );
};
const BillIcon = React.forwardRef(SvgComponent);
export default BillIcon;
