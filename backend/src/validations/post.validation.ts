import { has } from "lodash";
import * as yup from "yup";

import { maxFileSize } from "@/utils";
import {
  IMAGE_MIMES,
  NOT_IMG_ERR_MSG,
  generateArrayLengthErrorMessage,
  generateEitherErrorMessage,
  generateRequiredErrorMessage,
  generateTooLargeFileErrorMessage,
} from "@/utils/constants";
import { EUserRole } from "@/utils/enums";

import { offsetParamsSchema } from ".";

export const createPostSchema = yup.object({
  title: yup.string().required(generateRequiredErrorMessage("Title")),
  image: yup
    .mixed<File>()
    .required(generateRequiredErrorMessage("Image"))
    .test(
      "fileFormat",
      NOT_IMG_ERR_MSG,
      (value) => !!value && has(IMAGE_MIMES, value.type),
    )
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage("Image", "5 Mb"),
      (value) => !!value && value.size <= maxFileSize(5),
    ),
  categories: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Categories")))
    .min(1, generateArrayLengthErrorMessage("min", "category", 1))
    .required(generateRequiredErrorMessage("Categories")),
  published: yup.boolean().defined(generateRequiredErrorMessage("Published")),
  content: yup.string().required(generateRequiredErrorMessage("Content")),
  tags: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Tags")))
    .required(generateRequiredErrorMessage("Tags")),
});

export const updatePostSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("Post ID")),
  title: yup.string(),
  image: yup
    .mixed<File>()
    .test("fileFormat", NOT_IMG_ERR_MSG, (value) => {
      if (value === undefined) return true;
      return !!value && has(IMAGE_MIMES, value.type);
    })
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage("Image", "5 Mb"),
      (value) => {
        if (value === undefined) return true;
        return !!value && value.size <= maxFileSize(5);
      },
    ),
  categories: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Categories")))
    .min(1, generateArrayLengthErrorMessage("min", "category", 1)),
  published: yup.bool(),
  content: yup.string(),
  tags: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Tags"))),
});

export const getAllPostsByTagSchema = offsetParamsSchema.shape({
  role: yup
    .string()
    .required(generateRequiredErrorMessage("Role"))
    .oneOf(
      Object.values(EUserRole),
      generateEitherErrorMessage("Role", "AUTHOR", "ADMIN"),
    ),
  tag: yup.string().required(generateRequiredErrorMessage("Tag")),
});
