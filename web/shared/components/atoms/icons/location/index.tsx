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
      height={(props.size || 500) * 1.064}
      fill="none"
      ref={ref}
      viewBox="0 0 500 500"
      {...props}
    >
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M173.218 34.425a206.775 206.775 0 0 1 153.563 0l4.122 1.648c80.403 32.165 131.072 112.33 125.672 198.761a200.585 200.585 0 0 1-69.644 139.77L268.829 475.801c-10.841 9.291-26.817 9.291-37.658 0L113.067 374.604a200.588 200.588 0 0 1-69.64-139.77C38.024 148.403 88.694 68.238 169.097 36.073l4.12-1.648Z"
      />
      <path
        fill="var(--foreground)"
        d="M218.75 218.75c0-17.259 13.991-31.25 31.25-31.25s31.25 13.991 31.25 31.25S267.259 250 250 250s-31.25-13.991-31.25-31.25Z"
      />
    </svg>
  );
};
const LocationIcon = React.forwardRef(SvgComponent);
export default LocationIcon;
