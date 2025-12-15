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
      height={(props.size || 500) * 1.070048309178744}
      fill="none"
      ref={ref}
      viewBox="0 0 414 443"
      {...props}
    >
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={9.091}
        d="M4.545 70.454C4.545 59.158 13.703 50 25 50h223.662c3.767 0 7.38 1.497 10.044 4.16l48.497 48.498a14.205 14.205 0 0 1 4.161 10.044v266.843c0 6.277-5.088 11.364-11.364 11.364H32.954c-15.69 0-28.409-12.719-28.409-28.409V70.454Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={9.091}
        d="M61.363 25.67c0-11.666 9.457-21.123 21.123-21.123h214.756a34.094 34.094 0 0 1 24.107 9.985l36.847 36.848a34.09 34.09 0 0 1 9.986 24.106V385.23a5.681 5.681 0 0 1-5.682 5.681H32.954c15.69 0 28.41-12.719 28.41-28.409V25.669Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={9.091}
        d="M186.364 95.453h56.818M106.818 140.906h215.909M106.818 186.359h215.909M106.818 231.82h215.909M271.591 4.547h17.045c9.414 0 17.046 7.631 17.046 17.045V44.32c0 12.551 10.175 22.727 22.727 22.727h22.727c9.414 0 17.046 7.631 17.046 17.045v17.046"
      />
      <path
        fill="var(--foreground)"
        d="M144.318 44.32h-29.545c-7.532 0-13.637 6.105-13.637 13.637v29.545c0 7.531 6.105 13.636 13.637 13.636h29.545c7.531 0 13.636-6.105 13.636-13.636V57.957c0-7.532-6.105-13.637-13.636-13.637Z"
      />
      <path
        fill="var(--foreground)"
        stroke="var(--foreground)"
        strokeWidth={11.364}
        d="M385.227 311.359h-79.545c-12.552 0-22.727 10.176-22.727 22.728v79.545c0 12.552 10.175 22.727 22.727 22.727h79.545c12.552 0 22.728-10.175 22.728-22.727v-79.545c0-12.552-10.176-22.728-22.728-22.728Z"
      />
      <path
        className={fill}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={9.091}
        d="m317.045 373.862 28.41-28.409 28.409 28.409M345.455 402.271v-56.818"
      />
    </svg>
  );
};
const UploadIcon = React.forwardRef(SvgComponent);
export default UploadIcon;
