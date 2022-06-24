// Error Messages
export const INVALID_CREDENTIAL = "Invalid email, phone or password";
export const INVALID_EMAIL = "Email must be a valid email";
export const PASSWORD_NOT_LONG_ENOUGH =
  "Password must be at least 6 characters";
export const PASSWORD_TOO_LONG =
  "Password must be less than or equal 255 characters";
export const INVALID_MOBILE = "Mobile is invalid";
export const EXIST_ERR_MSG = (key: string) => `${key} already exist`;
export const NOT_EXIST_ERR_MSG = (key: string) => `${key} not exist`;
export const NOT_EXIST_FOR_ERR_MSG = (field: string, fr: string) =>
  `${field} not exist for ${fr}`;
export const REQUIRED_ERR_MSG = (key: string) => `${key} is required`;
export const MATCHED_ERR_MSG = (key: string) => `${key} must be matched`;
export const EITHER_ERR_MSG = (key: string, value: string) =>
  `${key} should be ${value}`;
export const CREATION_ERR_MSG = (key: string) => `${key} creation failed`;
export const UNKNOWN_ERR_MSG = "Something went wrong";
export const UN_AUTHORIZED_ERR_MSG = "Authorization failed";

// REDIS KEY
export const REFRESH_TOKEN_KEY_NAME = (id: string) => `REFRESH_TOKEN-${id}`;
