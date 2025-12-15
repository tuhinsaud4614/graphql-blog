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
        strokeWidth={25}
        d="M217.188 33.378a65.626 65.626 0 0 1 65.625 0l138.381 79.894a65.627 65.627 0 0 1 32.812 56.834v159.788a65.626 65.626 0 0 1-31.866 56.277l-.946.557-138.381 79.893-.001.001a65.622 65.622 0 0 1-65.624 0v-.001L78.806 386.728a65.628 65.628 0 0 1-32.812-56.834V170.106a65.626 65.626 0 0 1 31.866-56.277l.946-.557 138.382-79.894Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={25}
        d="M203.125 226.561v-21.372a32.615 32.615 0 0 1 5.48-18.097c19.692-29.539 63.098-29.539 82.79 0a32.615 32.615 0 0 1 5.48 18.097v2.695c0 15.819-10.122 29.862-25.13 34.866l-7.279 2.426A21.156 21.156 0 0 0 250 265.246v16.002"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={15.625}
        d="M242.188 335.938a7.813 7.813 0 1 1 15.626 0 7.813 7.813 0 0 1-15.626 0Z"
      />
    </svg>
  );
};
const NoLevelMiniIcon = React.forwardRef(SvgComponent);
export default NoLevelMiniIcon;
