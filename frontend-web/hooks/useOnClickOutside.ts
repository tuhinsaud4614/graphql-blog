import * as React from "react";

import useEventListener from "./useEventListener";

type Handler = (event: MouseEvent) => void;

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T> | React.RefObject<T>[],
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
  useEventListener(mouseEvent, (event) => {
    if (Array.isArray(ref)) {
      const isTrue = ref.reduce(
        (prev, cur) =>
          prev || !cur?.current || cur?.current.contains(event.target as Node),
        false,
      );
      if (isTrue) {
        return;
      }
    } else {
      if (!ref?.current || ref?.current.contains(event.target as Node)) {
        return;
      }
    }

    handler(event);
  });
}
