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
        d="M482.025 139.857v224.975c0 48.757-39.531 88.288-88.288 88.288H106.263c-48.756 0-88.287-39.531-88.287-88.288V139.857c0-48.756 39.53-88.287 88.287-88.287h287.474c48.757 0 88.288 39.531 88.288 88.287Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M171.875 96.094V17.969M328.125 96.094V17.969"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M31.25 174.219h437.5"
      />
    </svg>
  );
};
const CalenderIcon = React.forwardRef(SvgComponent);
export default CalenderIcon;
