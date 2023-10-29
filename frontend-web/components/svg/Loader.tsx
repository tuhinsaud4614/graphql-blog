"use client";

import * as React from "react";

const Component = (
  props: React.SVGProps<SVGSVGElement>,
  ref: React.Ref<SVGSVGElement>,
) => {
  const a = React.useId();
  const b = React.useId();
  return (
    <svg
      {...props}
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <path
          id={a}
          d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15"
          fill="none"
        />
        <path id={b} d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0" fill="none" />
      </defs>
      <g transform="rotate(0 50 50)">
        <use
          xlinkHref={`#${a}`}
          stroke="hsl(var(--base-200))"
          strokeWidth="3"
        />
      </g>
      <g transform="rotate(60 50 50)">
        <use
          xlinkHref={`#${a}`}
          stroke="hsl(var(--base-200))"
          strokeWidth="3"
        />
      </g>
      <g transform="rotate(120 50 50)">
        <use
          xlinkHref={`#${a}`}
          stroke="hsl(var(--base-200))"
          strokeWidth="3"
        />
      </g>
      <g transform="rotate(0 50 50)">
        <circle cx="50" cy="15" r="9" fill="hsl(var(--primary))">
          <animateMotion dur="1s" repeatCount="indefinite" begin="0s">
            <mpath xlinkHref={`#${b}`} />
          </animateMotion>
        </circle>
      </g>
      <g transform="rotate(60 50 50)">
        <circle cx="50" cy="15" r="9" fill="hsl(var(--secondary))">
          <animateMotion
            dur="1s"
            repeatCount="indefinite"
            begin="-0.16666666666666666s"
          >
            <mpath xlinkHref={`#${b}`} />
          </animateMotion>
        </circle>
      </g>
      <g transform="rotate(120 50 50)">
        <circle cx="50" cy="15" r="9" fill="hsl(var(--accent))">
          <animateMotion
            dur="1s"
            repeatCount="indefinite"
            begin="-0.3333333333333333s"
          >
            <mpath xlinkHref={`#${b}`} />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
};
const ForwardRef = React.forwardRef(Component);
export default ForwardRef;
