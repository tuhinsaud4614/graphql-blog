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
        strokeWidth={35.94}
        d="M99.998 49.227h299.989c45.304 0 82.036 36.733 82.036 82.037v206.239c-.003 45.301-36.737 82.036-82.036 82.036h-69.45l-2.579 14.906c-1.401 8.101-2.185 16.431-2.185 24.913 0 16.118-17.688 25.837-31.236 17.473l-.641-.412-20.167-13.455-.005-.004a256.381 256.381 0 0 1-44.603-37.758l-5.322-5.663H99.998c-45.302 0-82.035-36.736-82.036-82.037V131.264c0-45.303 36.733-82.036 82.036-82.037Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M140.621 187.5h203.126M140.621 281.25h109.375"
      />
    </svg>
  );
};
const ChatPopIcon = React.forwardRef(SvgComponent);
export default ChatPopIcon;
