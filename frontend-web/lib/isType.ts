import _has from "lodash/has";

import { IUser } from "./types";

/**
 * The function checks if the current environment is development.
 * @returns a boolean value indicating whether the current environment is set to "development" or not.
 */
export function isDev() {
  return process.env.NODE_ENV === "development";
}

/**
 * The function `isIUser` checks if the provided data is of type `IUser` by verifying the presence of
 * specific properties.
 * @param {unknown} data - The `data` parameter is of type `unknown`, which means it can be any type.
 * It is the input data that we want to check if it matches the `IUser` interface.
 * @returns a boolean value.
 */
export const isIUser = (data: unknown): data is IUser => {
  return (
    typeof data === "object" && data !== null && _has(data, "email"),
    _has(data, "about"),
    _has(data, "authorStatus"),
    _has(data, "avatar"),
    _has(data, "exp"),
    _has(data, "iat"),
    _has(data, "id"),
    _has(data, "mobile"),
    _has(data, "role")
  );
};
