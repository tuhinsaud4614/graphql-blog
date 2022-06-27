import { GraphQLYogaError } from "@graphql-yoga/node";
import * as yup from "yup";
import { formatYupError } from "../utils";
import { VALIDATION_ERR_MSG } from "../utils/constants";

export class CustomError {
  constructor(public message: string) {
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function getGraphqlYogaError(error: any, msg: string, errFor?: string) {
  if (error instanceof CustomError) {
    return new GraphQLYogaError(error.message);
  }

  if (error instanceof yup.ValidationError) {
    const err = formatYupError(error);
    return new GraphQLYogaError(VALIDATION_ERR_MSG(errFor), {
      fields: err,
    });
  }
  return new GraphQLYogaError(msg);
}
