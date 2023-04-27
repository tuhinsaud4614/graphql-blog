import { GraphQLError } from "graphql";

import { has } from "lodash";
import * as yup from "yup";

import { CustomError, UserInputError } from "@/model";
import { formatYupError, maxFileSize } from "@/utils";
import {
  IMAGE_MIMES,
  INTERNAL_SERVER_ERROR,
  NOT_IMG_ERR_MSG,
  generateNotIntegerErrorMessage,
  generateNotNumberErrorMessage,
  generateRequiredErrorMessage,
  generateTooLargeFileErrorMessage,
  generateValidationErrorMessage
} from "@/utils/constants";

export function getGraphqlYogaError(
  error: any,
  msg: string,
  errFor?: string,
  code: string = INTERNAL_SERVER_ERROR,
) {
  if (error instanceof CustomError) {
    return error;
  }

  if (error instanceof yup.ValidationError) {
    const err = formatYupError(error);
    return new UserInputError(generateValidationErrorMessage(errFor), {
      fields: err,
    });
  }
  return new GraphQLError(msg, { extensions: { code } });
}

export const idParamsSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("ID")),
});

export const uploadFileSchema = yup.object().shape({
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