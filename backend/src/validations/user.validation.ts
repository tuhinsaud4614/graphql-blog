import * as yup from "yup";

import {
  INVALID_EMAIL,
  INVALID_MOBILE,
  INVALID_MOBILE_OR_EMAIL_ERR_MSG,
  MATCHED_ERR_MSG,
  PASSWORD_NOT_LONG_ENOUGH,
  PASSWORD_TOO_LONG,
  REQUIRED_ERR_MSG,
  VALID_EMAIL_REGEX,
  VALID_MOBILE_REGEX,
} from "@/utils/constants";

export const registerSchema = yup.object({
  name: yup.string(),
  email: yup.string().required(REQUIRED_ERR_MSG("Email")).email(INVALID_EMAIL),
  mobile: yup
    .string()
    .required(REQUIRED_ERR_MSG("Mobile"))
    .test("validMobile", INVALID_MOBILE, (value) => {
      return !!value && VALID_MOBILE_REGEX.test(value);
    }),
  password: yup
    .string()
    .required(REQUIRED_ERR_MSG("password"))
    .min(3, PASSWORD_NOT_LONG_ENOUGH)
    .max(255, PASSWORD_TOO_LONG),
  confirmPassword: yup
    .string()
    .required(REQUIRED_ERR_MSG("Confirm password"))
    .oneOf([yup.ref("password"), null], MATCHED_ERR_MSG("Password")),
});

export const resendActivationSchema = yup.object().shape({
  userId: yup.string().required(REQUIRED_ERR_MSG("User id")),
});

export const verifyUserSchema = yup.object().shape({
  userId: yup.string().required(REQUIRED_ERR_MSG("User id")),
  code: yup.string().required(REQUIRED_ERR_MSG("Verification code")),
});

export const loginSchema = yup.object({
  emailOrMobile: yup
    .string()
    .required(REQUIRED_ERR_MSG("Email/Mobile"))
    .test(
      "validMobile",
      INVALID_MOBILE_OR_EMAIL_ERR_MSG("Email/Mobile"),
      (value) => {
        return (
          !!value &&
          (VALID_MOBILE_REGEX.test(value) || VALID_EMAIL_REGEX.test(value))
        );
      },
    ),
  password: yup.string().required(REQUIRED_ERR_MSG("password")),
});

export const resetPasswordSchema = yup.object({
  oldPassword: yup.string().required(REQUIRED_ERR_MSG("Old password")),
  newPassword: yup
    .string()
    .required(REQUIRED_ERR_MSG("New password"))
    .min(3, PASSWORD_NOT_LONG_ENOUGH)
    .max(255, PASSWORD_TOO_LONG),
});
