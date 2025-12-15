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
        fillOpacity={0.1}
        d="M421.875 343.75H78.125C34.978 343.75 0 378.728 0 421.875S34.978 500 78.125 500h343.75C465.022 500 500 465.022 500 421.875s-34.978-78.125-78.125-78.125Z"
      />
      <path
        className={fill}
        fill="currentColor"
        d="m365.699 437.178-105.758 8.136V171.875l118.054 43.703c17.834 6.603 29.673 23.611 29.673 42.628v133.652c0 23.751-18.286 43.5-41.969 45.32Z"
      />
      <path
        fill="var(--foreground)"
        d="m301.143 188.126 74.782 31.081c16.086 6.686 26.563 22.406 26.566 39.826v131.591c-.002 23.816-19.306 43.122-43.122 43.122h-58.226v19.378h58.226c33.438 0 60.747-26.261 62.425-59.28l.075-3.22V259.033c-.003-25.248-15.198-48.018-38.512-57.709l-82.214-34.164v20.966Zm-22.554-30.335c-19.142-7.951-39.318-4.167-53.985 6.988h70.801l-16.816-6.988Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={19.375}
        d="M302.811 103.97c-.001-32.364-32.206-54.858-62.592-43.716L132.691 99.683c-26.957 9.884-44.877 35.543-44.877 64.255v226.684c.003 29.166 23.645 52.811 52.811 52.811h162.186V103.97Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={25}
        d="M156.25 171.875h7.812M156.25 250h7.812M156.25 328.125h7.812M226.562 171.875h7.813M226.562 250h7.813"
      />
    </svg>
  );
};
const CompanyDetailIcon = React.forwardRef(SvgComponent);
export default CompanyDetailIcon;
