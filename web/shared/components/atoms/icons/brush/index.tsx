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
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="M147.874 147.874C252.05 43.698 378.725 1.473 430.816 53.561c52.087 52.087 9.862 178.764-94.316 282.939-104.175 104.178-230.852 146.403-282.94 94.316-31.484-31.485-28.51-90.222 1.774-154.767"
      />
      <path
        className={fill}
        fill="currentColor"
        d="M446.809 364.747c21.035 23.254 20.154 58.91-2.015 81.085-21.744 21.747-56.575 23.094-79.925 3.081L78.125 203.126l5.371-6.195 16.357 16.357 103.272 5.463 30.029-90.149 213.655 236.145Z"
      />
      <path
        fill="var(--foreground)"
        d="m462.372 380.459 3.694 4.516c17.175 23.094 15.14 55.719-5.616 76.478l-4.213 3.816c-20.368 16.787-49.59 17.843-71.137 2.593l-4.516-3.509L78.125 203.122l5.371-6.195 16.357 16.357 47.913 2.533 256.318 221.345c9.013 7.775 22.522 7.288 30.944-1.131 8.578-8.578 8.891-22.39.731-31.372L220.184 167.508l13.031-39.063 229.157 252.014Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M38.464 46.215c.675-.71 1.87-1.538 3.906-2.093 3.824-1.037 9.482-.734 15.148 1.77l11.135 5.567c21.029 9.4 47.467 13.379 87.612 13.38 31.975.006 60.852 19.32 73.563 46.33 12.125 25.765 10.385 60.692-23.78 94.862-20.127 20.127-41.159 28.059-60.681 28.053-19.784-.006-39.976-8.174-57.961-23.694-36.132-31.184-61.242-90.704-50.604-160.226.341-2.22 1.067-3.321 1.662-3.949Z"
      />
    </svg>
  );
};
const BrushIcon = React.forwardRef(SvgComponent);
export default BrushIcon;
