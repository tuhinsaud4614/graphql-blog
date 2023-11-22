import { useSearchParams } from "next/navigation";

/**
 * The function `useIntegerQueryValue` takes an array of keys and returns an object with the
 * corresponding query parameter values parsed as integers.
 * @param {T[]} keys - An array of strings representing the keys to be used for querying the search
 * parameters.
 * @returns The function `useIntegerQueryValue` returns an object with keys corresponding to the input
 * `keys` array, and values that are either integers or null. The values are obtained by parsing the
 * corresponding query parameter from the URL using `useSearchParams`, and converting it to an integer
 * if it is a valid integer value. If the query parameter is not a valid integer, the value will be
 * null.
 */
export default function useIntegerQueryValue<T extends string>(keys: T[]) {
  const searchParams = useSearchParams();

  return keys.reduce(
    (prev, key) => {
      const value = searchParams.get(key);
      const integerValue =
        value && Number.isInteger(+value) ? Math.abs(+value) : undefined;
      return { ...prev, key: integerValue };
    },
    {} as Record<T, number | undefined>,
  );
}
