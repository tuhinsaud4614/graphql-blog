import * as React from "react";
import { motion, SVGMotionProps } from "motion/react";

import { IconVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnimatedHourglass1IconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  variant?: IconVariant;
  duration?: number;
}

const getColors = (variant: IconVariant = "normal") => {
  switch (variant) {
    case "primary":
      return { glass: "text-foreground", sand: "text-primary" };
    case "success":
      return { glass: "text-foreground", sand: "text-chart-2" };
    case "info":
      return { glass: "text-foreground", sand: "text-chart-1" };
    case "warning":
      return { glass: "text-foreground", sand: "text-chart-3" };
    case "error":
      return { glass: "text-foreground", sand: "text-destructive" };
    case "alternate":
      return { glass: "text-foreground", sand: "text-alternate" };
    default:
      return { glass: "text-foreground", sand: "text-foreground" };
  }
};

const AnimatedHourglass1Icon = React.forwardRef<
  SVGSVGElement,
  AnimatedHourglass1IconProps
>(
  (
    { size = 24, variant = "normal", duration = 4, className, ...props },
    ref
  ) => {
    const { glass, sand } = getColors(variant);
    const id = React.useId();
    const glassClipId = `glass-clip-${id}`;
    const topHalfClipId = `top-half-clip-${id}`;
    const bottomHalfClipId = `bottom-half-clip-${id}`;

    // SVG Paths
    const bodyPath =
      "M17.2014 2H6.79876C5.341 2 4.06202 2.9847 4.0036 4.40355C3.93009 6.18879 5.18564 7.37422 6.50435 8.4871C8.32861 10.0266 9.24075 10.7964 9.33642 11.7708C9.35139 11.9233 9.35139 12.0767 9.33642 12.2292C9.24075 13.2036 8.32862 13.9734 6.50435 15.5129C5.14932 16.6564 3.9263 17.7195 4.0036 19.5964C4.06202 21.0153 5.341 22 6.79876 22L17.2014 22C18.6591 22 19.9381 21.0153 19.9965 19.5964C20.043 18.4668 19.6244 17.342 18.7352 16.56C18.3298 16.2034 17.9089 15.8615 17.4958 15.5129C15.6715 13.9734 14.7594 13.2036 14.6637 12.2292C14.6487 12.0767 14.6487 11.9233 14.6637 11.7708C14.7594 10.7964 15.6715 10.0266 17.4958 8.4871C18.8366 7.35558 20.0729 6.25809 19.9965 4.40355C19.9381 2.9847 18.6591 2 17.2014 2Z";
    const baseDetailPath =
      "M9 21.6381C9 21.1962 9 20.9752 9.0876 20.7821C9.10151 20.7514 9.11699 20.7214 9.13399 20.6923C9.24101 20.509 9.42211 20.3796 9.78432 20.1208C10.7905 19.4021 11.2935 19.0427 11.8652 19.0045C11.955 18.9985 12.045 18.9985 12.1348 19.0045C12.7065 19.0427 13.2095 19.4021 14.2157 20.1208C14.5779 20.3796 14.759 20.509 14.866 20.6923C14.883 20.7214 14.8985 20.7514 14.9124 20.7821C15 20.9752 15 21.1962 15 21.6381V22H9V21.6381Z";

    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        ref={ref}
        className={cn(glass, className)}
        {...props}
      >
        <defs>
          {/* Clip path defined by the glass body shape */}
          <clipPath id={glassClipId}>
            <path d={bodyPath} />
          </clipPath>
          {/* Clip path for top half */}
          <clipPath id={topHalfClipId}>
            <rect x="0" y="0" width="24" height="12" />
          </clipPath>
          {/* Clip path for bottom half */}
          <clipPath id={bottomHalfClipId}>
            <rect x="0" y="12" width="24" height="12" />
          </clipPath>
        </defs>

        {/* Container for rotation */}
        <motion.g
          animate={{
            rotate: [0, 0, 180, 180],
          }}
          transition={{
            duration: duration,
            ease: "easeInOut",
            times: [0, 0.4, 0.8, 1],
            repeat: Infinity,
          }}
          style={{ transformBox: "view-box", transformOrigin: "center" }}
        >
          {/* Glass Body Outline */}
          <path d={bodyPath} stroke="currentColor" strokeWidth="1.5" />
          {/* Base Detail Outline */}
          <path
            d={baseDetailPath}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Sand Logic:
                We need to clip the sand by the Glass Shape AND the Top/Bottom halves.
                Nesting elements is the SVG way to intersection of clips.
            */}

          {/* Outer Clip: Glass Shape. Ensures sand never leaks outside the hourglass. */}
          <g clipPath={`url(#${glassClipId})`}>
            {/* Top Sand Group */}
            <g clipPath={`url(#${topHalfClipId})`}>
              {/* Sand Rect: Starts full, moves down (emptying) */}
              <motion.rect
                x="0"
                y="0"
                width="24"
                height="12"
                className={sand}
                fill="currentColor"
                // y=0: full. y=12: empty (as it moves out of top clip)
                initial={{ y: 0 }}
                animate={{ y: [0, 12, 12, 12] }}
                transition={{
                  duration: duration,
                  times: [0, 0.4, 0.4, 1],
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </g>

            {/* Bottom Sand Group */}
            <g clipPath={`url(#${bottomHalfClipId})`}>
              {/* Sand Rect: Starts empty (pushed down), moves up (filling) */}
              <motion.rect
                x="0"
                y="12"
                width="24"
                height="12"
                className={sand}
                fill="currentColor"
                // y=12: starts at 12+12=24 (empty locally? No, initial position is y=12. +12 translation = y=24).
                // Wait, transform is relative.
                // initial y translation = 12. Position becomes 12+12=24. Outside.
                // animate to y translation = 0. Position becomes 12. Full.
                initial={{ y: 12 }}
                animate={{ y: [12, 0, 0, 0] }}
                transition={{
                  duration: duration,
                  times: [0, 0.4, 0.4, 1],
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </g>

            {/* 
                   Stream: Middle falling sand.
                   We put it here inside the glass clip just in case, but it's central anyway.
                   Actually, if we put it here, it gets clipped by Top/Bottom clips if we aren't careful.
                   We want it to span across the center.
                   So it should NOT be in the Top/Bottom groups.
                   It should be in the 'Glass' clipped group, or independent.
                   Independent is safest to ensure visibility.
                */}
          </g>

          {/* Falling Stream - Independent of Top/Bottom clips, but can be clipped by Glass if desired.
                It's thin enough (width 1.5) that it fits in the neck (width ~1).
                Wait, neck is very thin. Neck path: ...9.33... to ...14.66...
                (14.66 - 9.33) ~ 5.3 units wide? No.
                Let's check coords around y=12.
                P1: ...11.7708... 
                x coords are around 9.3 and 14.6 at y=11.77.
                So width is ~ 5.3px.
                Stream width 1.5 is fine.
            */}
          <motion.rect
            x="11.25"
            y="9"
            width="1.5"
            height="7"
            className={sand}
            fill="currentColor"
            animate={{
              scaleY: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            style={{ originY: 0 }}
            transition={{
              duration: duration,
              times: [0, 0.05, 0.35, 0.4],
              repeat: Infinity,
            }}
          />
        </motion.g>
      </motion.svg>
    );
  }
);

AnimatedHourglass1Icon.displayName = "AnimatedHourglass1Icon";

export default AnimatedHourglass1Icon;
