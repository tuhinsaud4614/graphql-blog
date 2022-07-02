import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import {
  createComment,
  createReply,
  deleteComment,
  getCommentForReply,
  getCommentForUser,
  updateComment,
} from "../services/comment.service";
import { getPostById } from "../services/post.service";
import {
  CREATION_ERR_MSG,
  DELETE_ERR_MSG,
  NOT_EXIST_ERR_MSG,
  UPDATE_ERR_MSG,
} from "../utils/constants";
import { IUserPayload } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { createCommentSchema } from "../validations/comment.validation";

export async function createCommentCtrl(
  prisma: PrismaClient,
  postId: string,
  content: string,
  user: IUserPayload,
  parentComment?: string
) {
  try {
    await createCommentSchema.validate(
      { postId, content, parentComment },
      { abortEarly: false }
    );

    // If parent comment is valid thats means it's a reply
    if (parentComment) {
      const parent = await getCommentForReply(prisma, parentComment, postId);

      if (!parent) {
        return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Comment"));
      }

      const comment = await createReply(prisma, parent.id, user.id, content);
      return comment;
    }

    const isExist = await getPostById(prisma, postId);
    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }

    const comment = await createComment(prisma, isExist.id, user.id, content);

    return comment;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("Comment"));
  }
}

export async function updateCommentCtrl(
  prisma: PrismaClient,
  commentId: string,
  content: string,
  user: IUserPayload
) {
  try {
    const isExist = await getCommentForUser(prisma, commentId, user.id);
    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Comment or Reply"));
    }

    if (isExist.content === content) {
      return isExist;
    }

    const comment = await updateComment(prisma, commentId, content);
    return comment;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, UPDATE_ERR_MSG("Comment"));
  }
}

export async function deleteCommentCtrl(
  prisma: PrismaClient,
  commentId: string,
  user: IUserPayload
) {
  try {
    const isExist = await getCommentForUser(prisma, commentId, user.id);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Comment or Reply"));
    }

    const comment = await deleteComment(prisma, commentId);
    return comment.id;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Comment"));
  }
}
