import * as yup from "yup";

import {
  EITHER_ERR_MSG,
  INVALID_EMAIL,
  INVALID_MOBILE,
  MATCHED_ERR_MSG,
  PASSWORD_NOT_LONG_ENOUGH,
  PASSWORD_TOO_LONG,
  REQUIRED_ERR_MSG,
  VALID_MOBILE_REGEX,
} from "../utils/constants";
import { EUserRole } from "../utils/enums";

export const registerSchema = yup.object().shape({
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
