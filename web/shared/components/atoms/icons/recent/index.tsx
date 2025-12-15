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
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M250 125v125l-93.75 62.5"
      />
      <path
        className={stroke}
        fill="currentColor"
        d="M250 0c138.072 0 250 111.929 250 250 0 77.091-34.937 145.972-89.794 191.828-1.578 1.322-3.956.184-3.956-1.875 0-1.353-1.1-2.453-2.453-2.453h-8.403c-11.222 0-16.053-16.616-7.478-23.85 46.553-39.253 76.134-97.981 76.134-163.65 0-118.223-95.825-214.05-214.05-214.05-118.223 0-214.05 95.827-214.05 214.05 0 118.225 95.827 214.05 214.05 214.05 3.622 0 7.221-.097 10.797-.281 10.825-.563 20.453 7.684 20.453 18.525 0 8.962-6.674 16.6-15.62 17.187-5.168.338-10.379.519-15.63.519C111.929 500 0 388.072 0 250 0 111.929 111.929 0 250 0Z"
      />
      <path
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="m359.375 359.375 15.622 93.75L468.75 437.5"
      />
    </svg>
  );
};
const RecentIcon = React.forwardRef(SvgComponent);
export default RecentIcon;
