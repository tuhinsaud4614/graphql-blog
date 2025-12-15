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
        d="m42.886 360.043-9.88 79.031c-.932 7.459 4.885 14.05 12.404 14.05h110.84l263.341-250.799c35.522-33.83 36.209-90.277 1.522-124.963-34.097-34.097-89.378-34.097-123.476 0L69.62 305.379a93.751 93.751 0 0 0-26.734 54.664Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="m156.25 453.124 263.341-250.799c35.522-33.83 36.209-90.277 1.522-124.963-34.097-34.097-89.378-34.097-123.476 0L69.62 305.379a93.751 93.751 0 0 0-26.734 54.664l-9.88 79.031c-.932 7.459 4.885 14.05 12.404 14.05h110.84Zm0 0h312.5"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="m359.375 140.625-93.75 93.75"
      />
    </svg>
  );
};
const EditIcon = React.forwardRef(SvgComponent);
export default EditIcon;
