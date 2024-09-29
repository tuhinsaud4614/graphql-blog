import * as React from "react";

import { usePathname, useSearchParams } from "next/navigation";

/**
 * The `useRouteChangeEffect` function is a custom hook that triggers a callback function
 * when the route changes.
 * @param {((...args: any) => any)|undefined} cb - The parameter `cb` is a callback function that takes
 * any number of arguments and returns any value. It is optional and can be undefined.
 */
export default function useRouteChangeEffect(
  cb: ((...args: any) => any) | undefined,
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Don't care cb already memorized or not. It will not cause re-render the component
  const closeHandler = React.useRef(cb);

  const url = React.useMemo(
    () => `${pathname}?${searchParams}`,
    [pathname, searchParams],
  );

  React.useEffect(() => {
    closeHandler.current?.();
  }, [url]);
}
