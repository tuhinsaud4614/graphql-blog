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
        d="M218.75 140.625c0-25.888-20.987-46.875-46.875-46.875S125 114.737 125 140.625v218.75c0 25.888 20.987 46.875 46.875 46.875s46.875-20.987 46.875-46.875v-218.75ZM375 140.625c0-25.888-20.987-46.875-46.875-46.875s-46.875 20.987-46.875 46.875v218.75c0 25.888 20.987 46.875 46.875 46.875S375 385.263 375 359.375v-218.75Z"
      />
    </svg>
  );
};
const StopIcon = React.forwardRef(SvgComponent);
export default StopIcon;
