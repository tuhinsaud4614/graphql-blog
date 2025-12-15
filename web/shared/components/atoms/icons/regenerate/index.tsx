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
        fill="currentColor"
        fillRule="evenodd"
        d="M185.133 91.383c7.323-7.322 7.323-19.194 0-26.516-7.322-7.323-19.194-7.323-26.516 0l-46.875 46.875c-7.322 7.322-7.322 19.194 0 26.516l46.875 46.875c7.322 7.322 19.194 7.322 26.516 0 7.323-7.322 7.323-19.194 0-26.516l-14.866-14.867H281.25c41.422 0 75 33.579 75 75v46.875c0 10.355 8.394 18.75 18.75 18.75s18.75-8.395 18.75-18.75V218.75c0-62.132-50.369-112.5-112.5-112.5H170.267l14.866-14.867ZM329.734 393.75l-14.868 14.865c-7.321 7.325-7.321 19.197 0 26.519 7.325 7.322 19.196 7.322 26.518 0l46.875-46.875c7.322-7.322 7.322-19.194 0-26.519l-46.875-46.875c-7.322-7.321-19.193-7.321-26.518 0-7.321 7.325-7.321 19.197 0 26.519l14.868 14.866H218.75c-41.421 0-75-33.578-75-75v-46.875c0-10.356-8.394-18.75-18.75-18.75-10.355 0-18.75 8.394-18.75 18.75v46.875c0 62.131 50.368 112.5 112.5 112.5h110.984Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const RegenerateIcon = React.forwardRef(SvgComponent);
export default RegenerateIcon;
