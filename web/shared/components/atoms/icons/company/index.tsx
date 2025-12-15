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
        d="m437.5 468.75-140.625 15.625v-343.75h93.75l62.5 84.822L437.5 468.75Z"
      />
      <path
        fill="var(--foreground)"
        d="M296.875 125v35.95h60.334c11.072 0 21.644 4.68 29.054 12.909l36.528 40.588c6.453 7.173 10.009 16.505 10.009 26.154v171.905c-.006 28.472-23.072 51.54-51.544 51.543h-84.381v35.95h84.381c45.3-.003 82.553-34.434 87.038-78.55l.456-8.943V240.601a75.086 75.086 0 0 0-19.256-50.202l-36.532-40.558A75.026 75.026 0 0 0 357.209 125h-60.334Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M237.487 17.977h-59.875a82.02 82.02 0 0 0-53.375 19.744L77.85 77.456c-18.178 15.583-28.624 38.342-28.625 62.286v272.766c.003 38.397 31.122 69.516 69.518 69.519h175.782V75.014c0-31.498-25.54-57.037-57.038-57.037Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M62.5 171.875h109.375M62.5 265.625h109.375M62.5 359.375h109.375"
      />
    </svg>
  );
};
const CompanyIcon = React.forwardRef(SvgComponent);
export default CompanyIcon;
