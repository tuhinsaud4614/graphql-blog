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
  let stroke = "text-foreground";
  if (variant === "primary") {
    stroke = "text-primary";
  } else if (variant === "success") {
    stroke = "text-chart-2";
  } else if (variant === "info") {
    stroke = "text-chart-1";
  } else if (variant === "warning") {
    stroke = "text-chart-3";
  } else if (variant === "error") {
    stroke = "text-destructive";
  } else if (variant === "alternate") {
    stroke = "text-alternate";
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 500}
      height={(props.size || 532) * 1.064}
      fill="none"
      ref={ref}
      viewBox="0 0 500 532"
      {...props}
    >
      <path
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="M78.125 221.875 250 362.5l171.875-140.625M250 346.875V18.75"
      />
      <path
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={37.5}
        d="M406.25 440.625C367.562 471.269 305.907 487.5 250 487.5s-117.561-16.231-156.25-46.875"
      />
    </svg>
  );
};
const DownloadCirIcon = React.forwardRef(SvgComponent);
export default DownloadCirIcon;
