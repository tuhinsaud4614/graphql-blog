import { GraphQLYogaError } from "@graphql-yoga/node";
import * as yup from "yup";
import { CustomError, UserInputError } from "../model";
import { formatYupError } from "../utils";
import {
  INTERNAL_SERVER_ERROR,
  REQUIRED_ERR_MSG,
  VALIDATION_ERR_MSG,
} from "../utils/constants";

export function getGraphqlYogaError(
  error: any,
  msg: string,
  errFor?: string,
  code: string = INTERNAL_SERVER_ERROR
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
  return new GraphQLYogaError(msg, { code });
}

export const uploadFileSchema = yup.object().shape({
  file: yup.mixed<File>().required(REQUIRED_ERR_MSG("File")),
});
