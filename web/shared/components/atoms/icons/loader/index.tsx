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
  } else if (variant === "adaptive") {
    stroke = "";
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
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={31.25}
        d="M375.02 416.664c-34.823 26.163-78.112 41.667-125.021 41.667-115.059 0-208.333-93.275-208.333-208.334S134.94 41.664 249.999 41.664s208.334 93.274 208.334 208.333c0 17.988-2.279 35.44-6.565 52.09-4.65 18.062-24.383 26.452-41.979 20.26-14.958-5.264-21.829-22.356-18.081-37.766a146.194 146.194 0 0 0 4.125-34.584c0-80.541-65.292-145.833-145.834-145.833-80.541 0-145.833 65.292-145.833 145.833 0 80.542 65.292 145.834 145.833 145.834 27.494 0 53.209-7.609 75.159-20.834"
      />
    </svg>
  );
};
const LoaderIcon = React.forwardRef(SvgComponent);
export default LoaderIcon;
