import * as React from "react";
import { fill } from "lodash-es";

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
  let fill = "text-foreground";
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
        fillRule="evenodd"
        d="M132.812 132.812c0-64.72 52.468-117.187 117.188-117.187s117.188 52.467 117.188 117.187v70.313H375c34.517 0 62.5 27.983 62.5 62.5v156.25c0 34.517-27.983 62.5-62.5 62.5H125c-34.518 0-62.5-27.983-62.5-62.5v-156.25c0-34.517 27.982-62.5 62.5-62.5h7.812v-70.313Zm187.5 0v70.313H179.688v-70.313C179.688 93.98 211.167 62.5 250 62.5s70.312 31.48 70.312 70.312Zm-39.062 187.5c0 11.769-6.505 22.018-16.116 27.347.321 1.249.491 2.557.491 3.903v31.25c0 8.63-6.995 15.626-15.625 15.626-8.63 0-15.625-6.996-15.625-15.626v-31.25c0-1.346.17-2.654.491-3.903-9.611-5.329-16.116-15.578-16.116-27.347 0-17.259 13.991-31.25 31.25-31.25s31.25 13.991 31.25 31.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const LockIcon = React.forwardRef(SvgComponent);
export default LockIcon;
