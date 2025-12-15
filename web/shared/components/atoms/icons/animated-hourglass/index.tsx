import * as React from "react";
import { motion, SVGMotionProps } from "motion/react";

import { IconVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnimatedHourglassIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  variant?: IconVariant;
  duration?: number;
}

const getColors = (variant: IconVariant = "normal") => {
  // We'll return classes instead of raw hex values to better sync with the theme.
  // The user can override via className on the component if needed.
  switch (variant) {
    case "primary":
      return { glass: "text-foreground", sand: "text-primary" };
    case "success":
      return { glass: "text-foreground", sand: "text-chart-2" }; // green-ish
    case "info":
      return { glass: "text-foreground", sand: "text-chart-1" }; // blue-ish
    case "warning":
      return { glass: "text-foreground", sand: "text-chart-3" }; // orange-ish
    case "error":
      return { glass: "text-foreground", sand: "text-destructive" };
    case "alternate":
      return { glass: "text-foreground", sand: "text-alternate" };
    default:
      // Normal/Default: Use a nice amber for sand by default if 'normal', else inherit.
      // But user asked for theme sync.
      return { glass: "text-foreground", sand: "text-foreground" };
  }
};

const AnimatedHourglassIcon = React.forwardRef<
  SVGSVGElement,
  AnimatedHourglassIconProps
>(
  (
    { size = 24, variant = "normal", duration = 4, className, ...props },
    ref
  ) => {
    const { glass, sand } = getColors(variant);
    const id = React.useId();
    const clipTopId = `clip-top-${id}`;
    const clipBottomId = `clip-bottom-${id}`;

    // Animation Timings
    // 0% -> 45%: Sand flows
    // 45% -> 50%: Pause
    // 50% -> 90%: Rotate
    // 90% -> 100%: Pause & Reset Loop (The snap back happens at 100%->0%)

    // Actually, to make it seamless:
    // We animate from t=0 to t=1.
    // Sand flows: 0 -> 0.5
    // Rotate: 0.5 -> 0.9
    // Pause: 0.9 -> 1.0 (Ready to snap back)

    // We need the rotation to be 180deg at the end.

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
        {/* Container for rotation */}
        <motion.g
          animate={{
            rotate: [0, 0, 180, 180],
          }}
          transition={{
            duration: duration,
            ease: "easeInOut",
            times: [0, 0.4, 0.8, 1], // flow ends at 0.4, rotate starts 0.4, ends 0.8, wait till 1
            repeat: Infinity,
          }}
          style={{ transformBox: "view-box", transformOrigin: "center" }}
        >
          {/* Glass Body */}
          <path
            d="M17 2H7C5.89543 2 5 2.89543 5 4V4.5C5 6.433 6.567 8 8.5 8H8.72C9.48 8 10.19 8.35 10.66 8.94L11.34 9.8C11.71 10.28 12.29 10.28 12.66 9.8L13.34 8.94C13.81 8.35 14.52 8 15.28 8H15.5C17.433 8 19 6.433 19 4.5V4C19 2.89543 18.1046 2 17 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 22H7C5.89543 22 5 21.1046 5 20V19.5C5 17.567 6.567 16 8.5 16H8.72C9.48 16 10.19 15.65 10.66 15.06L11.34 14.2C11.71 13.72 12.29 13.72 12.66 14.2L13.34 15.06C13.81 15.65 14.52 16 15.28 16H15.5C17.433 16 19 17.567 19 19.5V20C19 21.1046 18.1046 22 17 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top Sand - Shrinks */}
          <g clipPath={`url(#${clipTopId})`}>
            <defs>
              <clipPath id={clipTopId}>
                {/* This path matches the inner shape of top bulb */}
                <path d="M6.5 3.5H17.5V4.5C17.5 5.8 16.5 7 15.5 7H8.5C7.5 7 6.5 5.8 6.5 4.5V3.5Z" />
              </clipPath>
            </defs>
            {/* The sand rectangle itself */}
            <motion.rect
              x="5"
              y="2"
              width="14"
              height="6"
              className={sand}
              fill="currentColor"
              initial={{ y: 0 }}
              animate={{ y: [0, 6, 6, 6] }} // Moves down out of view
              transition={{
                duration: duration,
                times: [0, 0.4, 0.4, 1], // Finishes emptying at 0.4
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </g>

          {/* Bottom Sand - Grows */}
          {/* Uses a mask or clip to fill from bottom up */}
          <g clipPath={`url(#${clipBottomId})`}>
            <defs>
              <clipPath id={clipBottomId}>
                {/* This path matches the inner shape of bottom bulb */}
                <path d="M6.5 20.5H17.5V19.5C17.5 18.2 16.5 17 15.5 17H8.5C7.5 17 6.5 18.2 6.5 19.5V20.5Z" />
              </clipPath>
            </defs>
            <motion.rect
              x="5"
              y="16"
              width="14"
              height="6"
              className={sand}
              fill="currentColor"
              initial={{ y: 6 }}
              animate={{ y: [6, 0, 0, 0] }} // Moves up into view? No, filling up means y decreases if origin is top-left, or we move it into the clip area.
              // Let's think: The rect is at y=16 (top of bottom bulb is ~16).
              // We want it to "fill up". So we start with it pushed down (y offset +6), and animate to y offset 0.
              transition={{
                duration: duration,
                times: [0, 0.4, 0.4, 1],
                ease: "linear",
                repeat: Infinity,
              }}
            />

            {/* Pile effect? maybe too complex for now, keep it flat for smoothness */}
          </g>

          {/* Falling Stream */}
          <motion.line
            x1="12"
            y1="9"
            x2="12"
            y2="15"
            stroke="currentColor"
            strokeWidth="1.5"
            className={sand}
            strokeLinecap="round"
            strokeDasharray="10 10" // Make it look like particles/stream
            animate={{
              opacity: [0, 1, 1, 0],
              pathLength: [0, 1, 1, 0], // Grow then shrink?
              y2: [9, 17, 17, 17], // Fall down
            }}
            // This is tricky to loop perfectly with the rotation.
            // Let's just use a simple persistent line that fades in/out.
          />
          {/* Simpler Stream */}
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
              times: [0, 0.05, 0.35, 0.4], // Appear quickly, stay, disappear quickly
              repeat: Infinity,
            }}
          />
        </motion.g>
      </motion.svg>
    );
  }
);

AnimatedHourglassIcon.displayName = "AnimatedHourglassIcon";

export default AnimatedHourglassIcon;
