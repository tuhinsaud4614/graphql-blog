import { useCallback, useState } from "react";

export default function useCallbackRef<T extends Element>() {
  const [ref, setRef] = useState<T | null>(null);
  const fn = useCallback((node: T) => {
    setRef(node);
  }, []);

  return [ref, fn] as const;
}
