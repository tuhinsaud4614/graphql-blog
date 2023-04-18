import * as yup from "yup";

import { generateRequiredErrorMessage } from "@/utils/constants";

export const createCommentSchema = yup.object({
  postId: yup.string().required(generateRequiredErrorMessage("Post id")),
  content: yup
    .string()
    .required(generateRequiredErrorMessage("Comment content")),
  parentComment: yup.string(),
});
