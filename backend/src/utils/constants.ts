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
export const TOO_LARGE_FILE_ERR_MSG = (field: string, value: string) =>
  `${field} size should be less than ${value}`;
export const ARRAY_LENGTH_ERR_MSG = (
  mode: "min" | "max",
  field: string,
  min: number
) => `${mode === "min" ? "At least" : "Maximum"} ${min} ${field} required`;
export const EXIST_ERR_MSG = (key: string) => `${key} already exist`;
export const ROLE_ERR_MSG = (
  role: "admin" | "author" | "user",
  orRole?: "admin" | "author" | "user"
) => `You must be ${role}${orRole ? " or " + orRole : ""}`;
export const NOT_EXIST_ERR_MSG = (key: string) => `${key} not exist`;
export const NOT_EXIST_FOR_ERR_MSG = (field: string, fr: string) =>
  `${field} not exist for ${fr}`;
export const REQUIRED_ERR_MSG = (key: string) => `${key} is required`;
export const INVALID_MOBILE_OR_EMAIL_ERR_MSG = (key: string) =>
  `Must be a valid ${key}`;
export const MATCHED_ERR_MSG = (key: string) => `${key} must be matched`;
export const EITHER_ERR_MSG = (key: string, value: string) =>
  `${key} should be ${value}`;
export const NOT_NUM_ERR_MSG = (field: string, value: string = "number") =>
  `${field} should be ${value}`;
export const CREATION_ERR_MSG = (key: string) => `${key} creation failed`;
export const FETCH_ERR_MSG = (key: string) => `Failed to fetch ${key}`;
export const UPDATE_ERR_MSG = (key: string) => `${key} update failed`;
export const DELETE_ERR_MSG = (key: string) => `${key} delete failed`;
export const VALIDATION_ERR_MSG = (key?: string) =>
  key ? `${key} validation error` : "Validation error";

// REDIS KEY START
export const REFRESH_TOKEN_KEY_NAME = (id: string) => `REFRESH_TOKEN-${id}`;
export const USER_VERIFICATION_KEY_NAME = (id: string) =>
  `USER_VERIFICATION-${id}`;
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
