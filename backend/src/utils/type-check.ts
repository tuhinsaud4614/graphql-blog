import { has } from "lodash";

import { IExtensionsWithAuthorization, IVerifyResetPassword } from "./interfaces";

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
 * This TypeScript function checks if an object has the properties "code" and "hash" and returns a
 * boolean value.
 * @param {unknown} data - The `data` parameter is of type `unknown`, which means it can be any type of
 * value. The function is using a type guard to check if the `data` parameter is of type
 * `IVerifyResetPassword`.
 */
export const isVerifyResetPassword = (
  data: unknown,
): data is IVerifyResetPassword =>
  typeof data === "object" &&
  data !== null &&
  has(data, "code") &&
  has(data, "hash");

/**
 * This function checks if the current environment is set to development.
 */
export const isDev = () => process.env.NODE_ENV === "development";

/**
 * This TypeScript function checks if an object has a "headers" property with an "Authorization"
 * property inside it.
 * @param {any} extensions - The `extensions` parameter is of type `any`, which means it can be any
 * data type. The function is checking if this parameter is an object with a `headers` property that is
 * also an object, and if that `headers` object has an `Authorization` property. If all of these
 */
export const isExtensionsWithAuthorization = (
  extensions: any,
): extensions is IExtensionsWithAuthorization =>
  typeof extensions === "object" &&
  "headers" in extensions &&
  typeof extensions.headers === "object" &&
  "Authorization" in extensions.headers;
