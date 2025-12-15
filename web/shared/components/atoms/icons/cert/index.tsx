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
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M212.402 42.179a75.788 75.788 0 0 1 75.195 0l125 71.441a75.784 75.784 0 0 1 38.178 65.796v141.175a75.785 75.785 0 0 1-38.178 65.797l-125 71.44a75.794 75.794 0 0 1-75.195 0l-125-71.44a75.783 75.783 0 0 1-38.177-65.797V179.416a75.782 75.782 0 0 1 38.178-65.796l124.999-71.441Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M328.125 171.875c-41.592 49.91-62.184 86.931-92.636 141.744L218.75 343.75l-14.837-29.672c-10.829-21.66-27.045-41.333-47.663-57.828"
      />
    </svg>
  );
};
const CertIcon = React.forwardRef(SvgComponent);
export default CertIcon;
