import * as yup from "yup";

import { generateRequiredErrorMessage } from "@/utils/constants";

import { offsetParamsSchema } from ".";

export const tagsByTextWithOffsetSchema = offsetParamsSchema.shape({
  text: yup.string().required(generateRequiredErrorMessage("Text")),
});
