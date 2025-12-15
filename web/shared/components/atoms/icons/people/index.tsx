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
        d="M250 252.352c93.234 0 143.484 11.829 170.165 28.503 12.775 7.984 20.038 17.025 24.353 26.733 4.457 10.029 6.257 21.904 6.257 36.164 0 55.99-23.825 89.137-59.297 109.406-36.972 21.125-87.913 28.869-141.478 28.869-53.566 0-104.508-7.744-141.48-28.869-35.471-20.269-59.295-53.416-59.295-109.406 0-14.26 1.798-26.135 6.255-36.164 4.316-9.708 11.58-18.749 24.354-26.733 26.68-16.674 76.932-28.503 170.166-28.503Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M224.304 24.11a118.482 118.482 0 0 1 51.392 0c52.582 11.684 86.539 62.848 76.904 115.844l-7.75 42.572c-1.622 8.905-5.125 17.365-10.315 24.78-41.073 58.675-127.996 58.675-169.068 0a62.775 62.775 0 0 1-10.315-24.78l-7.752-42.572c-9.635-52.996 24.323-104.16 76.904-115.845Z"
      />
    </svg>
  );
};
const PeopleIcon = React.forwardRef(SvgComponent);
export default PeopleIcon;
