import { has } from "lodash";
import * as yup from "yup";
import { maxFileSize } from "../utils";

import {
  ARRAY_LENGTH_ERR_MSG,
  EITHER_ERR_MSG,
  IMAGE_MIMES,
  NOT_IMG_ERR_MSG,
  NOT_NUM_ERR_MSG,
  REQUIRED_ERR_MSG,
  TOO_LARGE_FILE_ERR_MSG,
} from "../utils/constants";
import { EUserRole } from "../utils/enums";

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
    .required(REQUIRED_ERR_MSG("Categories")),
  published: yup.bool().required(REQUIRED_ERR_MSG("Published")),
  content: yup.string().required(REQUIRED_ERR_MSG("Content")),
  tags: yup.array().of(yup.string()),
});

export const updatePostSchema = yup.object().shape({
  title: yup.string(),
  image: yup
    .mixed<File>()
    .test("fileFormat", NOT_IMG_ERR_MSG, (value) => {
      if (value === undefined) return true;
      return !!value && has(IMAGE_MIMES, value.type);
    })
    .test("fileSize", TOO_LARGE_FILE_ERR_MSG("Image", "5 Mb"), (value) => {
      if (value === undefined) return true;
      return !!value && value.size <= maxFileSize(5);
    }),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, ARRAY_LENGTH_ERR_MSG("min", "category", 1)),
  published: yup.bool(),
  content: yup.string(),
  tags: yup.array().of(yup.string()),
});

export const offsetQueryParamsSchema = yup.object().shape({
  limit: yup
    .number()
    .required(REQUIRED_ERR_MSG("Limit"))
    .integer(NOT_NUM_ERR_MSG("Limit", "integer")),
  after: yup.string().nullable(),
});

export const getAllPostsByTagSchema = yup.object().shape({
  role: yup
    .string()
    .required(REQUIRED_ERR_MSG("Role"))
    .oneOf(Object.values(EUserRole), EITHER_ERR_MSG("Role", "AUTHOR, ADMIN")),
  tag: yup.string().required(REQUIRED_ERR_MSG("Tag")),
  limit: yup.number().integer(NOT_NUM_ERR_MSG("Limit", "integer")),
  page: yup.number().integer(NOT_NUM_ERR_MSG("Page", "integer")),
});
