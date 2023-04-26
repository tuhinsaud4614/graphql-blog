import { has } from "lodash";

import { IVerifyResetPassword } from "./interfaces";

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
