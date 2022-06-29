import { has } from "lodash";
import * as yup from "yup";
import { maxFileSize } from "../utils";

import {
  ARRAY_LENGTH_ERR_MSG,
  EITHER_ERR_MSG,
  IMAGE_MIMES,
  INVALID_EMAIL,
  MATCHED_ERR_MSG,
  NOT_IMG_ERR_MSG,
  PASSWORD_NOT_LONG_ENOUGH,
  PASSWORD_TOO_LONG,
  REQUIRED_ERR_MSG,
  TOO_LARGE_FILE_ERR_MSG,
} from "../utils/constants";
import { EUserRole } from "../utils/enums";

export const registerSchema = yup.object().shape({
  email: yup.string().required(REQUIRED_ERR_MSG("Email")).email(INVALID_EMAIL),
  password: yup
    .string()
    .required(REQUIRED_ERR_MSG("password"))
    .min(3, PASSWORD_NOT_LONG_ENOUGH)
    .max(255, PASSWORD_TOO_LONG),
  confirmPassword: yup
    .string()
    .required(REQUIRED_ERR_MSG("Confirm password"))
    .oneOf([yup.ref("password"), null], MATCHED_ERR_MSG("Password")),
  role: yup
    .string()
    .required(REQUIRED_ERR_MSG("Role"))
    .oneOf(
      [EUserRole.Author, EUserRole.User],
      EITHER_ERR_MSG("Role", "USER/AUTHOR")
    ),
});

export const loginSchema = yup.object().shape({
  emailOrMobile: yup.string().required(REQUIRED_ERR_MSG("Email/Mobile")),
  password: yup.string().required(REQUIRED_ERR_MSG("password")),
});

export const createPostSchema = yup.object().shape({
  title: yup.string().required(REQUIRED_ERR_MSG("Title")),
  image: yup
    .mixed<File>()
    .required(REQUIRED_ERR_MSG("Image"))
    .test(
      "fileFormat",
      NOT_IMG_ERR_MSG,
      (value) => !!value && has(IMAGE_MIMES, value.type)
    )
    .test(
      "fileSize",
      TOO_LARGE_FILE_ERR_MSG("Image", "5 Mb"),
      (value) => !!value && value.size <= maxFileSize(5)
    ),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, ARRAY_LENGTH_ERR_MSG("min", "category", 1))
    .required(REQUIRED_ERR_MSG("Title")),
  published: yup.bool().required(REQUIRED_ERR_MSG("Published")),
  content: yup.string().required(REQUIRED_ERR_MSG("Content")),
  tags: yup.array().of(yup.string()),
});
