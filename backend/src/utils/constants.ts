/* eslint-disable no-useless-escape */

/* eslint-disable no-control-regex */
import { isVowel } from "./type-check";

// Error Messages
export const INVALID_CREDENTIAL = "Invalid email, phone or password";
export const INVALID_EMAIL = "Enter a valid email";
export const PASSWORD_NOT_LONG_ENOUGH =
  "Password must be at least 6 characters";
export const PASSWORD_TOO_LONG =
  "Password must be less than or equal 255 characters";
export const INVALID_MOBILE = "Mobile is invalid";
export const INVALID_FILE_ERR_MSG = "Invalid file type";
export const FAILED_FILE_ERR_MSG = "Failed to upload file";
export const UNKNOWN_ERR_MSG = "Something went wrong";
export const UN_AUTH_ERR_MSG = "You are not authorized";
export const AUTH_FAIL_ERR_MSG = "Authentication failed";
export const AUTH_NEED_ERR_MSG = "Authentication is required";
export const FOLLOW_OWN_ERR_MSG = "You can't follow yourself";
export const UN_FOLLOW_OWN_ERR_MSG = "You can't un-follow yourself";
export const ALREADY_FOLLOWED_ERR_MSG = "You already followed him/her";
export const ALREADY_UN_FOLLOWED_ERR_MSG = "You already un-follow him/her";
export const USER_FOLLOWED_ERR_MSG = "You can follow Admin or Author";
export const FOLLOW_ERR_MSG = "Follow request failed";
export const REACTIONS_ERR_MSG = "Reactions request failed";
export const NOT_IMG_ERR_MSG =
  "File should be image (gif, svg, jpeg, jpg, png, webp)";
export const VERIFIED_AUTHOR_ERR_MSG = `You must a verified author`;

/**
 * This function generates an error message for when a file size is too large.
 * @param {string} field - The name of the field that has a size limit.
 * @param {string} value - The value parameter in the function represents the maximum allowed size for
 * a file. The function generates an error message if a file exceeds this maximum size.
 * @returns a string message that states that the size of a certain field should be less than a certain
 * value. The message is generated using the parameters `field` and `value` passed to the function.
 */
export function generateTooLargeFileErrorMessage(
  field: string,
  value: string,
): string {
  return `${field} size should be less than ${value}.`;
}

/**
 * This function generates an error message indicating that a field does not exist for a given entity.
 * @param {string} field - The name of the field that does not exist.
 * @param {string} entity - The `entity` parameter is a string that represents the name of an entity
 * (e.g. user, product, order) for which a certain field does not exist.
 * @returns a string message that says that a certain field does not exist for a certain entity. The
 * message is generated using the parameters `field` and `entity` passed to the function.
 */
export function generateEntityNotExistErrorMessage(
  field: string,
  entity: string,
): string {
  return `${field} does not exist for ${entity}.`;
}

/**
 * This TypeScript function generates an error message for an array field based on whether it should
 * have a minimum or maximum length.
 * @param {"min" | "max"} mode - A string that can only be either "min" or "max", indicating whether
 * the error message is for a minimum or maximum length requirement.
 * @param {string} field - The name of the field that the error message is referring to. For example,
 * if the field is an array of user names, the error message might say "The user names field must
 * contain at least 3 items."
 * @param {number} length - The length parameter is a number that represents the minimum or maximum
 * number of items that a field must contain, depending on the mode parameter.
 * @returns A string message indicating the minimum or maximum number of items required for a given
 * field in an array. The message is generated based on the input parameters `mode`, `field`, and
 * `length`.
 */
export function generateArrayLengthErrorMessage(
  mode: "min" | "max",
  field: string,
  length: number,
): string {
  const verb = mode === "min" ? "at least" : "at most";
  return `The ${field} field must contain ${verb} ${length} items.`;
}

/**
 * This function generates an error message indicating that a given key already exists.
 * @param {string} key - The key parameter is a string that represents the identifier or name of a
 * resource or object that already exists. The function generates an error message indicating that the
 * resource or object with the given key already exists.
 * @returns A string message that includes the key parameter and the phrase "already exists."
 */
export function generateExistErrorMessage(key: string): string {
  return `${key} already exists.`;
}

/**
 * Generates an error message indicating that a user must have a certain role.
 *
 * @param role The required role.
 * @param orRole An optional alternate role.
 * @returns The error message.
 */
export function generateRoleErrorMessage(
  role: "admin" | "author" | "user",
  orRole?: "admin" | "author" | "user",
): string {
  let message = `You must be ${isVowel(role) ? "an" : "a"} ${role}.`;

  if (orRole) {
    message += ` Alternatively, you must be ${
      isVowel(orRole) ? "an" : "a"
    } ${orRole}.`;
  }

  return message;
}

/**
 * Generates an error message indicating that a key does not exist.
 *
 * @param key The name of the key.
 * @returns The error message.
 */
export function generateNotExistErrorMessage(key: string): string {
  return `${key} does not exist.`;
}

/**
 * Generates an error message indicating that a key is required.
 *
 * @param key The name of the key.
 * @returns The error message.
 */
export function generateRequiredErrorMessage(key: string): string {
  return `${key} is required.`;
}

/**
 * Generates an error message indicating that a key must be a valid.
 *
 * @param key The name of a valid key.
 * @returns The error message.
 */
export function generateInvalidErrorMessage(key: string): string {
  return `Please enter a valid ${key}.`;
}

/**
 * Generates an error message indicating that two values must match.
 *
 * @param key The name of the key that must match.
 * @returns The error message.
 */
export function generateMatchedErrorMessage(key: string): string {
  return `${key} must match.`;
}

/**
 * Generates an error message indicating that a value should be one of two options.
 *
 * @param key The name of the key.
 * @param value1 The first valid value.
 * @param value2 The second valid value.
 * @returns The error message.
 */
export function generateEitherErrorMessage(
  key: string,
  value1: string,
  value2: string,
): string {
  return `${key} should be either "${value1}" or "${value2}".`;
}

/**
 * Generates an error message indicating that a value should be a number.
 *
 * @param field The name of the field.
 * @returns The error message.
 */
export function generateNotNumberErrorMessage(field: string): string {
  return `${field} should be a number.`;
}

/**
 * This TypeScript function generates an error message stating that a given field should be an integer.
 * @param {string} field - The name of the field that is expected to be an integer.
 * @returns a string message that says the input field should be an integer.
 */
export function generateNotIntegerErrorMessage(field: string): string {
  return `${field} should be a integer.`;
}

/**
 * This function generates an error message indicating that a given field is not a valid URL.
 * @param {string} [field] - The `field` parameter is an optional string parameter that represents the
 * name of the field that is not a valid URL. If this parameter is not provided, the error message will
 * simply say "is not valid url."
 * @returns A string message that includes the provided field parameter and the text "is not valid
 * url."
 */
export function generateNotUrlErrorMessage(field?: string): string {
  return `${field || "It"} is not valid url.`;
}

/**
 * Generates an error message indicating that the creation of an entity failed.
 *
 * @param entityName The name of the entity.
 * @returns The error message.
 */
export function generateCreationErrorMessage(entityName: string): string {
  return `Failed to create ${entityName}.`;
}

/**
 * Generates an error message indicating that the fetching of an entity failed.
 *
 * @param entityName The name of the entity.
 * @returns The error message.
 */
export function generateFetchErrorMessage(entityName: string): string {
  return `Failed to fetch ${entityName}.`;
}

/**
 * Generates an error message indicating that the update of an entity failed.
 *
 * @param entityName The name of the entity.
 * @returns The error message.
 */
export function generateUpdateErrorMessage(entityName: string): string {
  return `${entityName} update failed.`;
}

/**
 * Generates an error message indicating that the deletion of an entity failed.
 *
 * @param entityName The name of the entity.
 * @returns The error message.
 */
export function generateDeleteErrorMessage(entityName: string): string {
  return `${entityName} delete failed.`;
}

/**
 * Returns a validation error message.
 * @param key Optional key to indicate the field that failed validation.
 * @returns The validation error message.
 */
export function generateValidationErrorMessage(key?: string) {
  return key ? `Validation failed for ${key}.` : "Validation failed.";
}

/**
 * This function generates an error message stating that a specified entity needs to be
 * defined.
 * @param {string} entityName - The entityName parameter is a string that represents the name of an
 * entity that needs to be defined. This function generates an error message that informs the user that
 * the specified entity needs to be defined.
 * @returns A string message that says "[entityName] need to be defined." The value of [entityName]
 * will be the value of the parameter passed to the function.
 */
export function generateNotDefinedErrorMessage(entityName: string) {
  return `${entityName} need to be defined.`;
}

// REDIS KEY START
/**
 * Returns a string key for a refresh token, based on a given ID.
 *
 * @param {string} id - The ID to use in the key.
 * @returns {string} - The refresh token key name.
 */
export const generateRefreshTokenKeyName = (id: string) =>
  `REFRESH_TOKEN@${id}`;

/**
 * Generates a Redis key for user verification using the provided ID.
 *
 * The generated key format is: USER_VERIFICATION@${id}
 *
 * @param {string} id - The ID to use in the key.
 * @returns {string} The generated Redis key.
 */
export const generateUserVerificationKey = (id: string) =>
  `USER_VERIFICATION@${id}`;

/**
Generates a unique key for reset password verification

@param id - The id to be used for generating the key
@returns A unique key for reset password verification
*/
export const generateResetPasswordVerificationKeyForId = (id: string) =>
  `RESET_PASSWORD_VERIFICATION@${id}`;

// REDIS KEY END

export const IMAGE_MIMES = {
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// SUBSCRIPTION START
// error msg start
export const SUBSCRIPTION_USER_VERIFICATION_ERR_MSG =
  "Subscription user verification failed";
export const SUBSCRIPTION_FOLLOWING_ERR_MSG = "Subscription following failed";
export const SUBSCRIPTION_UN_FOLLOWING_ERR_MSG = "Subscription unfollow failed";
export const SUBSCRIPTION_REACTIONS_ERR_MSG = "Subscription reactions failed";
// error msg end

export const SUBSCRIPTION_FOLLOWING = (toId: string) => `FOLLOWING_${toId}`;
export const SUBSCRIPTION_REACTIONS = (toId: string) => `REACTIONS_${toId}`;
export const SUBSCRIPTION_USER_VERIFICATION = (userId: string) =>
  `USER_VERIFICATION-${userId}`;

// SUBSCRIPTION END

export const VALID_MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{11}$/;
export const URL_REGEX =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
export const VALID_EMAIL_REGEX =
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

// GraphqlYogaErrorCode
export const UN_AUTH_EXT_ERR_CODE = "UNAUTHENTICATED";
export const RATE_LIMIT_EXCEED = "RATE_LIMIT_EXCEED";
export const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
export const FORBIDDEN = "FORBIDDEN";
export const NO_CONTENT = "NO_CONTENT";
export const NOT_EXIST = "NOT_EXIST";
export const BAD_USER_INPUT = "BAD_USER_INPUT";
export const GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED";
export const PERSISTED_QUERY_NOT_SUPPORTED = "PERSISTED_QUERY_NOT_SUPPORTED";
export const PERSISTED_QUERY_NOT_FOUND = "PERSISTED_QUERY_NOT_FOUND";
export const GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED"; // The GraphQL operation string contains a syntax error.

export const SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"] as const;
