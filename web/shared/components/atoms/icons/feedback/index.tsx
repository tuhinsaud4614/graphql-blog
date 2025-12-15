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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="M384.217 56.398c44.362-.067 80.36 35.878 80.362 80.241v205.73c-.002 44.181-35.714 80.05-79.896 80.241l-63.15.265a39.889 39.889 0 0 0-25.35 9.235l-35.279 29.398c-6.312 5.263-15.496 5.263-21.808 0l-35.218-29.356a39.879 39.879 0 0 0-25.533-9.237h-62.683c-44.318 0-80.241-35.923-80.241-80.242V137.067c0-44.269 35.85-80.172 80.119-80.241l268.677-.428Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="M250 281.247c0-18.662 11.942-35.231 29.646-41.131l5.714-1.906c16.209-5.402 27.14-20.569 27.14-37.653v-2.885c0-24.739-15.829-46.701-39.298-54.524a73.374 73.374 0 0 0-46.404 0c-23.468 7.823-39.298 30.028-39.298 54.766"
      />
      <path
        fill="var(--foreground)"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={30}
        d="M250 337.914a5.846 5.846 0 0 1 5.84 5.84 5.845 5.845 0 0 1-5.84 5.839 5.845 5.845 0 0 1-5.84-5.839 5.846 5.846 0 0 1 5.84-5.84Z"
      />
    </svg>
  );
};
const FeedbackIcon = React.forwardRef(SvgComponent);
export default FeedbackIcon;
