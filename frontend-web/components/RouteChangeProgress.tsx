"use client";

import { Next13ProgressBar } from "next13-progressbar";

export default function RouteChangeProgress() {
  return (
    <>
      <Next13ProgressBar
        height="0.25rem"
        color="hsl(var(--secondary))"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
}
