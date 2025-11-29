import * as yup from "yup";

export const postCacheSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().nullable(),
  content: yup.string().nullable(),
  author: yup
    .object({
      authorId: yup.string().required(),
      fullName: yup.string().nullable(),
      firstName: yup.string().nullable(),
      lastName: yup.string().nullable(),
    })
    .required(),
  tags: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .required(),
  categories: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .required(),
});

export type PostCache = yup.InferType<typeof postCacheSchema>;
