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
        strokeWidth={29.167}
        d="M95.54 115.826a863.46 863.46 0 0 1 308.92 0c34.815 6.33 60.119 36.655 60.119 72.042v186.767c0 35.388-25.304 65.713-60.119 72.042a863.419 863.419 0 0 1-308.92 0c-34.816-6.329-60.12-36.654-60.12-72.042V187.868c0-35.387 25.304-65.712 60.12-72.042Z"
      />
      <path
        fill="var(--foreground)"
        d="M394.837 229.885c6.148-5.204 6.915-14.404 1.713-20.554-5.204-6.148-14.404-6.914-20.554-1.712l9.421 11.133 9.42 11.133Zm-353.17-42.383-8.363 11.947 63.01 44.107 8.363-11.948 8.363-11.946-63.01-44.107-8.363 11.947Zm63.01 44.106-8.363 11.948c91.07 63.75 213.661 58.135 298.523-13.671l-9.42-11.133-9.421-11.133c-74.75 63.252-182.736 68.197-262.956 12.043l-8.363 11.946Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="m354.167 104.165-24.773-41.288a38.932 38.932 0 0 0-18.048-15.754 155.732 155.732 0 0 0-122.691 0 38.935 38.935 0 0 0-18.049 15.754l-24.773 41.288"
      />
    </svg>
  );
};
const JobIcon = React.forwardRef(SvgComponent);
export default JobIcon;
