import * as yup from "yup";

import {
  INVALID_EMAIL,
  PASSWORD_NOT_LONG_ENOUGH,
  PASSWORD_TOO_LONG,
  generateMatchedErrorMessage,
  generateRequiredErrorMessage,
} from "@/utils/constants";

import { cursorParamsSchema, idParamsSchema } from ".";

export const registerSchema = yup.object({
  name: yup.string(),
  password: yup
    .string()
    .required(generateRequiredErrorMessage("Password"))
    .min(3, PASSWORD_NOT_LONG_ENOUGH)
    .max(255, PASSWORD_TOO_LONG),
  confirmPassword: yup
    .string()
    .required(generateRequiredErrorMessage("Confirm password"))
    .oneOf([yup.ref("password")], generateMatchedErrorMessage("Password")),
  verificationLink: yup
    .string()
    .required(generateRequiredErrorMessage("User verification link")),
  email: yup
    .string()
    .required(generateRequiredErrorMessage("Email"))
    .email(INVALID_EMAIL),
});

export const verifyCodeSchema = yup.object({
  code: yup
    .string()
    .required(generateRequiredErrorMessage("Verification code")),
});

export const verifyUserSchema = idParamsSchema.concat(verifyCodeSchema);

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(generateRequiredErrorMessage("Email"))
    .email(INVALID_EMAIL),
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
  verificationLink: yup
    .string()
    .required(generateRequiredErrorMessage("Reset password verification link")),
});

export const updateNameSchema = yup.object({
  name: yup.string().required(generateRequiredErrorMessage("Name")),
});

export const updateAboutSchema = yup.object({
  value: yup.string().required(generateRequiredErrorMessage("About")),
});

export const authorIdWithCursorSchema = cursorParamsSchema.shape({
  authorId: yup.string(),
});
