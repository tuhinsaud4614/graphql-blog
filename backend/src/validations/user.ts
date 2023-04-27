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
  generateRequiredErrorMessage
} from "@/utils/constants";

import { idParamsSchema } from ".";

export const userEmailMobileSchema = yup.object({
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
});

export const registerSchema = userEmailMobileSchema.shape({
  name: yup.string(),
  password: yup
    .string()
    .required(generateRequiredErrorMessage("Password"))
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

export const verifyCodeSchema = yup.object({
  code: yup
    .string()
    .required(generateRequiredErrorMessage("Verification code")),
});

export const verifyUserSchema = idParamsSchema.concat(verifyCodeSchema);

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
