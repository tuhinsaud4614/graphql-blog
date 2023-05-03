import * as yup from "yup";

import { generateRequiredErrorMessage } from "@/utils/constants";

export const createCommentSchema = yup.object({
  postId: yup.string().required(generateRequiredErrorMessage("Post id")),
  content: yup
    .string()
    .required(generateRequiredErrorMessage("Comment content")),
  parentId: yup.string(),
});

export const updateCommentSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("ID")),
  content: yup.string().required(generateRequiredErrorMessage("Content")),
});
