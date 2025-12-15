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
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M224.151 60.64c10.654-21.301 41.044-21.301 51.697 0l51.821 103.639a17.993 17.993 0 0 0 12.112 9.49 17.954 17.954 0 0 0 14.984-3.326l57.313-44.586c19.778-15.38 48.422-.023 46.572 24.963l-18.863 254.517c-2.153 29.065-22.962 53.353-51.359 59.906a615.66 615.66 0 0 1-276.856 0c-28.397-6.553-49.208-30.841-51.361-59.906L41.351 150.82c-1.85-24.986 26.792-40.343 46.57-24.963l57.312 44.586a17.957 17.957 0 0 0 14.984 3.326 18.004 18.004 0 0 0 12.116-9.49l51.818-103.638Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M62.5 343.75c93.75 46.875 281.25 46.875 375 0"
      />
    </svg>
  );
};
const LevelIcon = React.forwardRef(SvgComponent);
export default LevelIcon;
