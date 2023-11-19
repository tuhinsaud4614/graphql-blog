import * as yup from "yup";

import { generateRequiredErrorMessage } from "@/utils/constants";

import { idParamsSchema, offsetParamsSchema } from ".";

export const categoriesByTextSchema = offsetParamsSchema.shape({
  text: yup.string().required(generateRequiredErrorMessage("Text")),
});

export const categoryCreationSchema = yup.object({
  title: yup.string().required(generateRequiredErrorMessage("Title")),
});

export const categoryModificationSchema = idParamsSchema.concat(
  categoryCreationSchema,
);

// Tags
export const tagCreationSchema = yup.object({
  title: yup.string().required(generateRequiredErrorMessage("Title")),
});
export const tagModificationSchema = idParamsSchema.concat(tagCreationSchema);
