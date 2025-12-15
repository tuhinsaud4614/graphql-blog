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
        strokeWidth={29.167}
        d="M250 35.422c118.51 0 214.579 96.068 214.579 214.579 0 118.51-96.069 214.579-214.579 214.579-118.511 0-214.58-96.069-214.58-214.579 0-118.511 96.069-214.58 214.58-214.58Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="m378.906 327.341-24.514-16.525c-62.161-41.9-144.298-38.719-203.03 7.862a105.17 105.17 0 0 0-39.818 82.4v6.471"
      />
      <path
        className="text-background"
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="M250.008 121.359c46.554.004 82.323 41.233 75.744 87.321l-1.342 9.421a65.49 65.49 0 0 1-12.431 30.008c-30.983 41.311-92.958 41.309-123.942 0a65.453 65.453 0 0 1-12.431-30.008l-1.343-9.421c-6.58-46.091 29.185-87.321 75.745-87.321Z"
      />
    </svg>
  );
};
const ProfileIcon = React.forwardRef(SvgComponent);
export default ProfileIcon;
