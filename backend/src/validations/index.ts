import { GraphQLYogaError } from "@graphql-yoga/node";
import * as yup from "yup";
import { formatYupError } from "../utils";
import { VALIDATION_ERROR_MSG } from "../utils/constants";

export function getGraphqlYogaError(error: any, msg: string, errFor?: string) {
  if (error instanceof yup.ValidationError) {
    const err = formatYupError(error);
    return new GraphQLYogaError(VALIDATION_ERROR_MSG(errFor), {
      fields: err,
    });
  }
  return new GraphQLYogaError(msg);
}
