import { GraphQLError } from "graphql";

import { has } from "lodash";
import * as yup from "yup";

import { CustomError, UserInputError } from "@/model";
import { formatYupError, maxFileSize } from "@/utils";
import {
  IMAGE_MIMES,
  INTERNAL_SERVER_ERROR,
  NOT_IMG_ERR_MSG,
  NOT_NUM_ERR_MSG,
  REQUIRED_ERR_MSG,
  TOO_LARGE_FILE_ERR_MSG,
  VALIDATION_ERR_MSG,
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
    return new UserInputError(VALIDATION_ERR_MSG(errFor), {
      fields: err,
    });
  }
  return new GraphQLError(msg, { extensions: { code } });
}

export const uploadFileSchema = yup.object().shape({
  file: yup.mixed<File>().required(REQUIRED_ERR_MSG("File")),
});

export const uploadImageSchema = yup.object().shape({
  image: yup
    .mixed<File>()
    .required(REQUIRED_ERR_MSG("Image"))
    .test(
      "fileFormat",
      NOT_IMG_ERR_MSG,
      (value) => !!value && has(IMAGE_MIMES, value.type),
    )
    .test(
      "fileSize",
      TOO_LARGE_FILE_ERR_MSG("Image", `${maxFileSize(5)} Mb`),
      (value) => !!value && value.size <= maxFileSize(5),
    ),
});

export const cursorParamsSchema = yup.object({
  limit: yup
    .number()
    .required(REQUIRED_ERR_MSG("Limit"))
    .integer(NOT_NUM_ERR_MSG("Limit", "integer")),
  after: yup.string().nullable(),
});

export const offsetParamsSchema = yup.object({
  limit: yup.number().integer(NOT_NUM_ERR_MSG("Limit", "integer")),
  page: yup.number().integer(NOT_NUM_ERR_MSG("Page", "integer")),
});
