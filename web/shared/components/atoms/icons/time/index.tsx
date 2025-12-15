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
        strokeWidth={35.938}
        d="M250 49.227c110.887 0 200.775 89.886 200.775 200.775 0 110.887-89.888 200.775-200.775 200.775-110.889 0-200.775-89.888-200.775-200.775C49.225 139.113 139.11 49.227 250 49.227Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M250 171.875V250l78.125 46.875"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="m93.75 406.25-46.875 46.875M453.125 453.125 406.25 406.25M93.75 46.875c-23.98 15.892-46.608 38.52-62.5 62.5M406.25 46.875c23.981 15.892 46.606 38.52 62.5 62.5"
      />
    </svg>
  );
};
const TimeIcon = React.forwardRef(SvgComponent);
export default TimeIcon;
