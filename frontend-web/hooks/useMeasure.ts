import { useState } from "react";
import useCallbackRef from "./useCallbackRef";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export default function useMeasure<T extends Element>() {
  const [element, attachRef] = useCallbackRef<T>();
  const [bounds, setBounds] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  useIsomorphicLayoutEffect(() => {
    function onResize([entry]: ResizeObserverEntry[]) {
      setBounds({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    }

    const observer = new ResizeObserver(onResize);

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return {
    bounds,
    ref: attachRef,
  } as const;
}
