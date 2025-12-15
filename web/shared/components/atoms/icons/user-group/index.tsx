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
        strokeWidth={36.25}
        d="M375.001 80.625c33.137 0 59.997 26.86 59.997 59.997 0 33.138-26.86 59.998-59.997 59.998-33.138 0-59.997-26.86-59.997-59.998 0-33.137 26.859-59.997 59.997-59.997Z"
      />
      <path
        className={fill}
        fill="currentColor"
        d="M375.001 250c109.375 0 125 46.875 125 93.75 0 78.125-62.5 109.375-125 109.375-19.835 0-39.656-3.184-57.494-9.978 17.847-23.591 26.244-53.125 26.244-86 0-42.184-17.988-71.901-57.495-89.172 18.775-11.1 46.895-17.975 88.745-17.975Z"
      />
      <path
        fill="var(--foreground)"
        d="M375.001 250c109.375 0 125 46.875 125 93.75 0 78.125-62.5 109.375-125 109.375-19.835 0-39.656-3.184-57.494-9.978 7.422-9.816 13.172-20.659 17.394-32.35 11.887 3.897 25.497 6.072 40.1 6.072 25.884 0 48.75-6.56 64.178-18.125 14.006-10.507 24.566-26.96 24.566-54.994 0-20.428-3.644-31.599-10.863-38.818-7.609-7.61-27.131-18.677-77.881-18.677-24.291 0-41.428 2.534-53.528 6.012-8.907-9.81-20.59-17.897-35.217-24.292 18.775-11.1 46.895-17.975 88.745-17.975Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth={36.25}
        d="M171.875 18.125c48.584 0 86.958 41.23 83.497 89.691l-1.16 16.113c-3.086 43.205-39.022 76.691-82.337 76.691-43.314 0-79.25-33.486-82.336-76.691l-1.16-16.113c-3.461-48.46 34.912-89.691 83.496-89.691ZM171.875 268.125c69.769 0 107.608 9.643 128.021 24.444 18.519 13.432 25.725 33.557 25.725 66.803 0 36.9-11.525 66.641-34.758 87.404-23.521 21.012-61.574 35.093-118.988 35.093-57.415 0-95.468-14.081-118.989-35.093-23.233-20.763-34.759-50.504-34.759-87.404 0-28.156 6.882-48.947 26.123-63.751 20.563-15.818 58.531-27.496 127.625-27.496Z"
      />
    </svg>
  );
};
const UserGroupIcon = React.forwardRef(SvgComponent);
export default UserGroupIcon;
