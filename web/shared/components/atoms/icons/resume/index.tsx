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
        strokeWidth={29.167}
        d="M443.746 133.345v186.301a68.78 68.78 0 0 1-20.142 48.625l-55.337 55.337a68.78 68.78 0 0 1-48.625 20.142H133.341c-42.572 0-77.087-34.515-77.087-77.088V133.345c0-42.572 34.515-77.087 77.087-77.087h233.317c42.573 0 77.088 34.515 77.088 77.087Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={29.167}
        d="M437.5 333.336h-66.667c-20.71 0-37.5 16.79-37.5 37.5v66.667"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="M135.417 145.836h93.75M135.417 208.336h197.916M135.417 270.836H187.5"
      />
    </svg>
  );
};
const ResumeIcon = React.forwardRef(SvgComponent);
export default ResumeIcon;
