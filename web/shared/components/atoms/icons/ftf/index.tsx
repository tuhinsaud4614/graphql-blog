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
        d="M343.771 12.46c80.216 0 143.749 60.494 143.75 133.334l-.004.986c-.329 41.708-21.36 79.06-54.479 103.45l-5.904 4.348.914 7.275c1.673 13.328 6.717 26.167 14.953 37.15v.001a.906.906 0 0 1 .131.222.23.23 0 0 1 .016.074.726.726 0 0 1-.088.357.734.734 0 0 1-.233.285.259.259 0 0 1-.069.032.934.934 0 0 1-.256.028h-16.333c-20.797 0-40.774-6.911-56.994-19.288l-3.953-3.016-4.946.523c-5.466.578-10.97.906-16.505.906-16.133 0-31.619-2.505-46.084-7.058-14.61-42.009-49.051-75.345-92.626-91.223a124.16 124.16 0 0 1-5.04-35.052l.011-1.704c.982-72.076 64.149-131.628 143.739-131.63Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={25}
        d="M302.083 114.586v20.833M364.583 135.419v-20.833"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={25}
        d="M302.083 177.086c18.923 12.616 43.578 12.616 62.5 0"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth={25}
        d="M166.667 179.164c86.764 0 154.166 61.211 154.166 133.333s-67.402 133.334-154.166 133.334c-6.951 0-13.848-.465-20.693-1.261l-6.006-.697-4.277 4.275-3.05 3.052a68.587 68.587 0 0 1-60.88 18.961l-1.053-.202-5.472-1.099a69.389 69.389 0 0 0 10.49-43.157l-.512-5.839-4.817-3.341-1.664-1.169C34.031 390.607 12.5 353.499 12.5 312.497c0-72.122 67.403-133.333 154.167-133.333Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={25}
        d="M156.25 250v20.833M218.75 270.833V250"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={25}
        d="M156.25 333.336a56.332 56.332 0 0 0 62.5 0"
      />
    </svg>
  );
};
const FtFIcon = React.forwardRef(SvgComponent);
export default FtFIcon;
