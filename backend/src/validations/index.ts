import { GraphQLYogaError } from "@graphql-yoga/node";
import * as yup from "yup";
import { UserInputError } from "../model";
import { formatYupError } from "../utils";
import { REQUIRED_ERR_MSG, VALIDATION_ERR_MSG } from "../utils/constants";

export class CustomError {
  constructor(public message: string) {
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function getGraphqlYogaError(
  error: any,
  msg: string,
  errFor?: string,
  code?: string
) {
  if (error instanceof CustomError) {
    return new GraphQLYogaError(error.message, { code });
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
