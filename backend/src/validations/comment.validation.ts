import * as yup from "yup";
import { REQUIRED_ERR_MSG } from "../utils/constants";

export const createCommentSchema = yup.object().shape({
  postId: yup.string().required(REQUIRED_ERR_MSG("Post id")),
  content: yup.string().required(REQUIRED_ERR_MSG("Comment content")),
  parentComment: yup.string(),
});
