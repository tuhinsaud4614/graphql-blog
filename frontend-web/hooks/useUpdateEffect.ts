import * as React from "react";

import useIsFirstRender from "./useIsFirstRender";

export default function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
) {
  const isFirst = useIsFirstRender();

  React.useEffect(() => {
    if (!isFirst) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
