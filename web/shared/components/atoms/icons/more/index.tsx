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
        d="M46.875 246.875c0-24.162 19.588-43.75 43.75-43.75h6.25c24.162 0 43.75 19.588 43.75 43.75v6.25c0 24.163-19.588 43.75-43.75 43.75h-6.25c-24.162 0-43.75-19.587-43.75-43.75v-6.25Zm156.25 0c0-24.162 19.588-43.75 43.75-43.75h6.25c24.163 0 43.75 19.588 43.75 43.75v6.25c0 24.163-19.587 43.75-43.75 43.75h-6.25c-24.162 0-43.75-19.587-43.75-43.75v-6.25Zm200-43.75c-24.163 0-43.75 19.588-43.75 43.75v6.25c0 24.163 19.587 43.75 43.75 43.75h6.25c24.163 0 43.75-19.587 43.75-43.75v-6.25c0-24.162-19.587-43.75-43.75-43.75h-6.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const MoreIcon = React.forwardRef(SvgComponent);
export default MoreIcon;
