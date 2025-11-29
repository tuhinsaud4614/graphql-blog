import * as yup from "yup";

export const passportJwtPayload = yup.object({
  id: yup.string(),
  iat: yup.number().optional().nullable(),
  exp: yup.number().optional().nullable(),
});

export type PassportJwtPayload = yup.InferType<typeof passportJwtPayload>;

export const googleOAuth2ProfileSchema = yup.object({
  provider: yup.string().required("Provider is required."),
  sub: yup.string().required("Sub is required."),
  id: yup.string().required("ID is required."),
  displayName: yup.string().optional().nullable(),
  name: yup
    .object({
      givenName: yup.string().optional().nullable(),
      familyName: yup.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  email: yup.string().required("Email is required.").email("Invalid email."),
  picture: yup.string().optional().nullable(),
});

export type GoogleOAuth2Profile = yup.InferType<
  typeof googleOAuth2ProfileSchema
>;
