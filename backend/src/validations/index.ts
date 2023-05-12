import { has } from "lodash";
import * as yup from "yup";

import { maxFileSize } from "@/utils";
import {
  IMAGE_MIMES,
  NOT_IMG_ERR_MSG,
  generateNotIntegerErrorMessage,
  generateNotNumberErrorMessage,
  generateRequiredErrorMessage,
  generateTooLargeFileErrorMessage,
} from "@/utils/constants";

export const idParamsSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("ID")),
});

export const fileParamsSchema = yup.object({
  file: yup.mixed<File>().required(generateRequiredErrorMessage("File")),
});

export const imageParamsSchema = yup.object({
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
      generateTooLargeFileErrorMessage("Image", `${maxFileSize(5)} Mb`),
      (value) => !!value && value.size <= maxFileSize(5),
    ),
});

export const cursorParamsSchema = yup.object({
  limit: yup
    .number()
    .required(generateRequiredErrorMessage("Limit"))
    .integer(generateNotIntegerErrorMessage("Limit")),
  after: yup.string().nullable(),
});

export const offsetParamsSchema = yup.object({
  limit: yup.number().integer(generateNotNumberErrorMessage("Limit")),
  page: yup.number().integer(generateNotIntegerErrorMessage("Page")),
});
