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
        d="M157 23v140.4h130.353l32.588 52.65V374H434V58.1L385.118 23H157Z"
      />
      <path
        fill="var(--foreground)"
        d="M390.197.458c44.122 4.481 78.55 41.735 78.553 87.036v231.262l-.456 8.941c-4.185 41.181-36.916 73.912-78.097 78.097l-8.941.456h-43a74.809 74.809 0 0 0 5.494-28.138V370.3h37.506c28.472-.003 51.541-23.072 51.544-51.544V87.494c-.003-28.472-23.072-51.54-51.544-51.544H212.494c-28.472.003-51.541 23.072-51.544 51.544V125H125V87.494C125.003 39.174 164.174.004 212.494 0h168.762l8.941.458Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M118.743 111.727h168.763c38.397.003 69.515 31.122 69.519 69.518v231.263c-.004 38.397-31.122 69.515-69.519 69.519H118.743c-38.396-.004-69.515-31.122-69.518-69.519V181.245c.003-38.396 31.122-69.515 69.518-69.518Z"
      />
    </svg>
  );
};
const CopyIcon = React.forwardRef(SvgComponent);
export default CopyIcon;
