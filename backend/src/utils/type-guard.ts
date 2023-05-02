import { has } from "lodash";

import {
  IExtensionsWithAuthorization,
  IVerifyResetPassword,
} from "./interfaces";

/**
 * This function checks if the current environment is set to development.
 */
export const isDev = () => process.env.NODE_ENV === "development";

/**
 * The function checks if the first character of a given string is a vowel.
 * @param {string} value - The input string that we want to check if its first character is a vowel or
 * not.
 * @returns The function `isVowel` returns a boolean value indicating whether the first character of
 * the input string is a vowel or not.
 */
export function isVowel(value: string) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const firstChar = value.charAt(0).toLowerCase();

  return vowels.has(firstChar);
}

/**
 * This function checks if an input object has all the specified keys.
 * @param {unknown} data - The data parameter is of type unknown, which means it can be any type of
 * value. However, the function checks if it is an object before proceeding with further checks.
 * @param {(keyof T)[]} keys - `keys` is an array of property names (keys) that are expected to exist
 * in the `data` object. The function checks if `data` is an object and if it has all the specified
 * keys. If it does, the function returns `true` and `data` is typecast
 * @returns a boolean value. It returns `true` if the `data` parameter is an object that has all the
 * keys specified in the `keys` parameter, and `false` otherwise.
 */
export function isObjectWithKeys<T extends object>(
  data: unknown,
  keys: (keyof T)[],
): data is T {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  return keys.every((key) => has(data, key));
}

/**
 * This function checks if an input object has the keys "code" and "hash" and returns a
 * boolean value.
 * @param {unknown} data - The `data` parameter is of type `unknown`, which means it can be any type of
 * value. The purpose of this function is to check if the `data` object has the properties `code` and
 * `hash`, and if it does, it returns `true` indicating that the `data
 * @returns A type guard function is being returned. It takes an argument of type `unknown`
 * and returns a boolean value indicating whether the argument is of type `IVerifyResetPassword`.
 */
export function isVerifyResetPassword(
  data: unknown,
): data is IVerifyResetPassword {
  return isObjectWithKeys<IVerifyResetPassword>(data, ["code", "hash"]);
}

/**
 * This function checks if an object has specific keys and returns a boolean value.
 * @param {unknown} extensions - The `extensions` parameter is of type `unknown`, which means it can be
 * any type of value. The purpose of this function is to check if the `extensions` object has a
 * specific structure that matches the `IExtensionsWithAuthorization` interface.
 * @returns The function `isExtensionsWithAuthorization` is returning a boolean value. It returns
 * `true` if the `extensions` parameter is an object that has a `headers` property which is also an
 * object with a `Authorization` property. Otherwise, it returns `false`.
 */
export function isExtensionsWithAuthorization(
  extensions: unknown,
): extensions is IExtensionsWithAuthorization {
  return (
    isObjectWithKeys<IExtensionsWithAuthorization>(extensions, ["headers"]) &&
    isObjectWithKeys<IExtensionsWithAuthorization["headers"]>(
      extensions.headers,
      ["Authorization"],
    )
  );
}

// export function isAuthenticateUser(user: UserWithAvatar | null) {
//   if (user === null) {
//     throw new AuthenticationError();
//   }
//   if (user.role === "ADMIN") {
//     return user;
//   }

//   if (user.authorStatus !== "VERIFIED") {
//     throw new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
//   }

//   return { ...user, role: "AUTHOR", authorStatus: "VERIFIED" } as const;
// }
