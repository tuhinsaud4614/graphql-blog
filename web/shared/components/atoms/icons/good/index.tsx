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
        d="m304.41 172.56 122.447 11.132c25.087 2.28 45.987 20.18 52.096 44.619a39.484 39.484 0 0 1-10.387 37.497l-4.369 4.37a37.8 37.8 0 0 0-11.072 26.73v25.301a71.113 71.113 0 0 1-11.95 39.463l-10.406 15.616a32.776 32.776 0 0 0-3.825 28.546c6.231 18.694-.819 39.25-17.219 50.182l-2.234 1.49a94.418 94.418 0 0 1-36.859 14.575l-20.513 3.419a294.443 294.443 0 0 1-106.174-1.713 113.256 113.256 0 0 1-45.749-20.453l-24.725-18.543a99.804 99.804 0 0 0-38.234-17.585l-73.033-16.231c-26.348-5.853-43.84-30.891-40.272-57.647l17.723-132.922c4.025-30.194 31.275-51.75 61.584-48.72l22.61 2.261c44.981 4.499 86.036-25.869 94.901-70.197l6.151-24.604c5.568-22.272 25.58-37.896 48.537-37.896h4.606c20.25 0 37.903 13.782 42.813 33.428a92.677 92.677 0 0 1-3.86 56.896l-17.312 43.276c-1.401 3.504.967 7.368 4.725 7.71Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M143.75 171.875 109.375 406.25"
      />
    </svg>
  );
};
const GoodIcon = React.forwardRef(SvgComponent);
export default GoodIcon;
