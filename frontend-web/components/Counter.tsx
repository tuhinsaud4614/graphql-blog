"use client";

import * as React from "react";

import { useInView, useMotionValue, useSpring } from "framer-motion";

interface Props {
  value: number;
  direction?: "up" | "down";
}

export default function Counter({ value, direction = "up" }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue, isInView]);

  React.useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0),
          );
        }
      }),
    [springValue],
  );

  if (value < 2) {
    return value;
  }

  return <span ref={ref} />;
}
