// Error Messages
export const INVALID_EMAIL = "Email must be a valid email";
export const PASSWORD_NOT_LONG_ENOUGH =
  "Password must be at least 6 characters";
export const PASSWORD_TOO_LONG =
  "Password must be less than or equal 255 characters";
export const INVALID_MOBILE = "Mobile is invalid";
export const EXIST_ERR_MSG = (key: string) => `${key} already exist`;
export const REQUIRED_ERR_MSG = (key: string) => `${key} is required`;
export const MATCHED_ERR_MSG = (key: string) => `${key} must be matched`;
export const EITHER_ERR_MSG = (key: string, value: string) =>
  `${key} should be ${value}`;
export const CREATION_ERR_MSG = (key: string) => `${key} creation failed`;
export const UNKNOWN_ERR_MSG = "Something went wrong";
