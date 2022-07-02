import * as yup from "yup";
import { NOT_NUM_ERR_MSG, REQUIRED_ERR_MSG } from "../utils/constants";

export const createCommentSchema = yup.object().shape({
  postId: yup.string().required(REQUIRED_ERR_MSG("Post id")),
  content: yup.string().required(REQUIRED_ERR_MSG("Comment content")),
  parentComment: yup.string(),
});

export const getAllCommentsSchema = yup.object().shape({
  postId: yup.string().required(REQUIRED_ERR_MSG("Post id")),
  limit: yup.number().integer(NOT_NUM_ERR_MSG("Limit", "integer")),
  page: yup.number().integer(NOT_NUM_ERR_MSG("Page", "integer")),
});
