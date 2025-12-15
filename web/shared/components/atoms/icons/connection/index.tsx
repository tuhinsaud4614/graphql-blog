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
        fillOpacity={0.1}
        d="M421.875 343.75H78.125C34.978 343.75 0 378.728 0 421.875S34.978 500 78.125 500h343.75C465.022 500 500 465.022 500 421.875s-34.978-78.125-78.125-78.125Z"
      />
      <path
        className={fill}
        fill="currentColor"
        d="M101.561 85.942c32.225-16.343 125.001 15.624 156.251 54.686-16.205 52.6-86.183 173.532-125 125C84.29 204.964 61.28 106.371 101.561 85.942ZM406.249 406.25c23.155-30.872 7.813-125-46.875-171.875-58.84 13.122-192.754 75.217-132.812 125 74.93 62.231 158.595 74.998 179.687 46.875Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M315.505 91.384c41.119-18.132 72.865-17.88 91.934 1.19 19.064 19.071 19.305 50.806 1.175 91.92-17.856 40.492-52.165 86.436-94.925 129.195-42.759 42.76-88.703 77.069-129.195 94.925-41.115 18.13-72.85 17.889-91.92-1.175-19.07-19.068-19.322-50.815-1.19-91.934 17.857-40.492 52.181-86.422 94.94-129.181 42.759-42.759 88.689-77.083 129.181-94.94Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M92.573 92.574c19.07-19.07 50.802-19.321 91.92-1.19 40.492 17.856 86.436 52.181 129.195 94.939 42.756 42.758 77.069 88.691 94.925 129.182 18.133 41.118 17.895 72.864-1.175 91.934-19.37 19.37-51.456 21.031-92.284 4.928-40.361-15.919-86.185-48.22-128.831-90.866-42.647-42.646-76.99-90.496-94.879-132.95-18.228-43.259-17.928-76.919 1.13-95.977Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M312.5 149.992c20.711 0 37.507 16.795 37.507 37.506s-16.796 37.507-37.507 37.507-37.506-16.796-37.506-37.507 16.795-37.506 37.506-37.506Z"
      />
    </svg>
  );
};
const ConnectionIcon = React.forwardRef(SvgComponent);
export default ConnectionIcon;
