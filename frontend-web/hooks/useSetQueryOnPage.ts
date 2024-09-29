import * as React from "react";

import { useSearchParams } from "next/navigation";

/**
 * The function `useSetQueryOnPage` is a TypeScript function that returns a callback function
 * `setQueryString` which sets a query string parameter in the URL.
 * @param {string} [path] - The `path` parameter is an optional string that represents the path of the
 * page. It is used to construct the URL with the query parameters. If the `path` is provided, the
 * returned URL will be in the format `?${params.toString()}`. If the `path` is
 * @returns The function `setQueryString` is being returned.
 */
export default function useSetQueryOnPage(path?: string) {
  const searchParams = useSearchParams();

  const setQueryString = React.useCallback(
    (query: Record<string, string>) => {
      const params = new URLSearchParams(searchParams ?? undefined);
      Object.entries(query).forEach(([key, value]) => params.set(key, value));
      return path ? `${path}?${params.toString()}` : params.toString();
    },
    [searchParams, path],
  );

  return setQueryString;
}
