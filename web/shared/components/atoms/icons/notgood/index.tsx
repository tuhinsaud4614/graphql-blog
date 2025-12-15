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
        d="M195.59 327.441L73.1445 316.31C48.0567 314.028 27.1567 296.128 21.047 271.689C17.6831 258.233 21.6256 243.999 31.4329 234.192L35.8032 229.822C42.8923 222.733 46.8748 213.118 46.8748 203.093V177.791C46.8748 163.746 51.0323 150.014 58.8235 138.327L69.2326 122.714C74.8432 114.298 76.2538 103.763 73.0554 94.1671C66.8232 75.4709 73.8757 54.9162 90.2735 43.9843L92.5088 42.494C103.626 35.0824 116.19 30.1144 129.369 27.9178L149.88 24.4993C185.084 18.6321 221.06 19.2122 256.055 26.2114C272.641 29.5285 288.273 36.5177 301.804 46.6662L326.528 65.2096C337.878 73.7221 350.912 79.7171 364.762 82.7949L437.797 99.0243C464.143 104.88 481.637 129.917 478.069 156.672L460.347 289.594C456.319 319.788 429.069 341.344 398.762 338.313L376.153 336.053C331.169 331.553 290.115 361.922 281.25 406.25L275.099 430.853C269.531 453.125 249.519 468.75 226.562 468.75H221.956C201.706 468.75 184.054 454.969 179.143 435.322C174.418 416.422 175.769 396.516 183.004 378.425L200.315 335.15C201.716 331.647 199.348 327.781 195.59 327.441Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M356.25 328.125L390.625 93.75"
      />
    </svg>
  );
};
const NotGoodIcon = React.forwardRef(SvgComponent);
export default NotGoodIcon;
