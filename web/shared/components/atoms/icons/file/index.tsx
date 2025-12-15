import * as React from "react";

import { IconVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

const SvgComponent = (
  {
    size,
    variant = "normal",
    ...rest
  }: React.SVGProps<SVGSVGElement> & {
    size?: number;
    variant?: IconVariant;
  },
  ref: React.Ref<SVGSVGElement>
) => {
  let fillFile = "[--fill-file:var(--background)]";
  let strokeFile = "[--stroke-file:var(--foreground)]";
  let foreground = "var(--foreground)";
  if (variant === "primary") {
    fillFile = "[--fill-file:var(--primary)]";
    strokeFile = "[--stroke-file:var(--foreground)]";
    foreground = "var(--foreground)";
  } else if (variant === "success") {
    fillFile = "[--fill-file:var(--chart-2)]";
    strokeFile = "[--stroke-file:var(--foreground)]";
    foreground = "var(--foreground)";
  } else if (variant === "info") {
    fillFile = "[--fill-file:var(--chart-1)]";
    strokeFile = "[--stroke-file:var(--foreground)]";
    foreground = "var(--foreground)";
  } else if (variant === "warning") {
    fillFile = "[--fill-file:var(--chart-3)]";
    strokeFile = "[--stroke-file:var(--foreground)]";
    foreground = "var(--foreground)";
  } else if (variant === "error") {
    fillFile = "[--fill-file:var(--destructive)]";
    strokeFile = "[--stroke-file:var(--foreground)]";
    foreground = "var(--foreground)";
  } else if (variant === "alternate") {
    fillFile = "[--fill-file:var(--alternate)]";
    strokeFile = "[--stroke-file:var(--foreground)]";
    foreground = "var(--foreground)";
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 500}
      height={size || 500}
      fill="none"
      ref={ref}
      viewBox="0 0 500 500"
      {...rest}
    >
      <path
        className={cn(fillFile, strokeFile)}
        fill="var(--fill-file)"
        stroke="var(--stroke-file)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M131.256 17.977h176.33a107.034 107.034 0 0 1 75.682 31.341l36.166 36.163a107.043 107.043 0 0 1 31.341 75.684v238.83c0 45.307-36.725 82.032-82.032 82.032H131.256c-45.305 0-82.031-36.725-82.031-82.032V100.008c0-45.305 36.726-82.031 82.031-82.031Z"
      />
      <path
        stroke={cn(foreground)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M140.625 140.625H187.5M140.625 234.375H343.75M140.625 328.125h31.25M250 328.125h93.75"
      />
    </svg>
  );
};
const FileIcon = React.forwardRef(SvgComponent);
export default FileIcon;
