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
        d="M250 17.977c128.147 0 232.025 103.878 232.025 232.025S378.147 482.027 250 482.027 17.975 378.149 17.975 250.002 121.853 17.977 250 17.977Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M250 17.977c9.278 0 19.551 4.407 30.517 15.503 11.036 11.168 21.665 28.102 30.914 49.987 18.469 43.7 29.969 103.736 29.969 166.535 0 62.797-11.5 122.834-29.969 166.534-9.249 21.884-19.878 38.819-30.914 49.988-10.966 11.096-21.239 15.503-30.517 15.503-9.279 0-19.552-4.407-30.518-15.503-11.036-11.169-21.665-28.104-30.914-49.988-18.468-43.7-29.968-103.737-29.968-166.534 0-62.799 11.5-122.835 29.968-166.535 9.249-21.885 19.878-38.819 30.914-49.987C230.448 22.385 240.721 17.977 250 17.977Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M31.25 250h437.5"
      />
    </svg>
  );
};
const WebIcon = React.forwardRef(SvgComponent);
export default WebIcon;
