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
  let fill = "text-foreground";
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
        fillRule="evenodd"
        d="M256.249 437.5c17.259 0 31.25-13.991 31.25-31.25v-12.5c0-17.259-13.991-31.25-31.25-31.25h-12.5c-17.259 0-31.25 13.991-31.25 31.25v12.5c0 17.259 13.991 31.25 31.25 31.25h12.5Zm-6.248-109.375c17.548 0 32.054-13.678 33.085-31.196l11.065-188.11C295.629 83.69 275.649 62.5 250.476 62.5h-.951c-25.173 0-45.153 21.19-43.674 46.319l11.065 188.11c1.03 17.518 15.537 31.196 33.085 31.196Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const WarnIcon = React.forwardRef(SvgComponent);
export default WarnIcon;
