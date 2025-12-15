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
        d="m93.75 62.5-15.625 78.125h62.5l93.75 78.125h187.5L406.25 62.5H93.75Z"
      />
      <path
        fill="var(--foreground)"
        d="M362.487 31.25c41.422 0 75.013 33.59 75.013 75.012v120.911c-9.2-5.327-19.856-8.423-31.25-8.423h-4.7V106.262c0-21.574-17.488-39.062-39.063-39.062H137.512c-21.574 0-39.062 17.488-39.062 39.062v49.988h-4.7c-11.395 0-22.05 3.096-31.25 8.423v-58.411c0-38.829 29.508-70.77 67.322-74.615l7.69-.397h224.975Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M94.116 142.977h67.505a44.552 44.552 0 0 1 31.494 13.03l25.879 25.879c15.089 15.089 35.547 23.588 56.885 23.591h142.424c25.566 0 45.884 21.471 44.466 46.996l-6.713 120.819c-2.415 43.469-38.375 77.485-81.909 77.485H126.801c-43.853-.004-79.949-34.5-81.94-78.31l-7.721-169.89c-1.468-32.474 24.467-59.6 56.976-59.6Z"
      />
    </svg>
  );
};
const FolderIcon = React.forwardRef(SvgComponent);
export default FolderIcon;
