import * as yup from "yup";

import {
  INVALID_EMAIL,
  INVALID_MOBILE,
  PASSWORD_NOT_LONG_ENOUGH,
  PASSWORD_TOO_LONG,
  VALID_EMAIL_REGEX,
  VALID_MOBILE_REGEX,
  generateInvalidErrorMessage,
  generateMatchedErrorMessage,
  generateRequiredErrorMessage,
} from "@/utils/constants";

export const registerSchema = yup.object({
  name: yup.string(),
  email: yup
    .string()
    .required(generateRequiredErrorMessage("Email"))
    .email(INVALID_EMAIL),
  mobile: yup
    .string()
    .required(generateRequiredErrorMessage("Mobile"))
    .test("validMobile", INVALID_MOBILE, (value) => {
      return !!value && VALID_MOBILE_REGEX.test(value);
    }),
  password: yup
    .string()
    .required(generateRequiredErrorMessage("password"))
    .min(3, PASSWORD_NOT_LONG_ENOUGH)
    .max(255, PASSWORD_TOO_LONG),
  confirmPassword: yup
    .string()
    .required(generateRequiredErrorMessage("Confirm password"))
    .oneOf(
      [yup.ref("password"), null],
      generateMatchedErrorMessage("Password"),
    ),
});

export const resendActivationSchema = yup.object({
  userId: yup.string().required(generateRequiredErrorMessage("User id")),
});

export const verifyUserSchema = yup.object().shape({
  userId: yup.string().required(generateRequiredErrorMessage("User id")),
  code: yup
    .string()
    .required(generateRequiredErrorMessage("Verification code")),
});

export const loginSchema = yup.object({
  emailOrMobile: yup
    .string()
    .required(generateRequiredErrorMessage("Email/Mobile"))
    .test(
      "validMobile",
      generateInvalidErrorMessage("Email/Mobile"),
      (value) => {
        return (
          !!value &&
          (VALID_MOBILE_REGEX.test(value) || VALID_EMAIL_REGEX.test(value))
        );
      },
    ),
  password: yup.string().required(generateRequiredErrorMessage("password")),
});

export const resetPasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required(generateRequiredErrorMessage("Old password")),
  newPassword: yup
    .string()
    .required(generateRequiredErrorMessage("New password"))
    .min(3, PASSWORD_NOT_LONG_ENOUGH)
    .max(255, PASSWORD_TOO_LONG),
});
