import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import logger from "../logger";
import {
  countCommentsForPost,
  createComment,
  createReply,
  deleteComment,
  getCommentForReply,
  getCommentForUser,
  getCommentsOnOffset,
  updateComment,
} from "../services/comment.service";
import { getPostById } from "../services/post.service";
import {
  CREATION_ERR_MSG,
  DELETE_ERR_MSG,
  FETCH_ERR_MSG,
  NOT_EXIST_ERR_MSG,
  UPDATE_ERR_MSG,
} from "../utils/constants";
import { IOffsetQueryParams, IUserPayload } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { createCommentSchema } from "../validations/comment.validation";
import { offsetQueryParamsSchema } from "../validations/post.validation";

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
    logger.error(error);
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
    logger.error(error);
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
    logger.error(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Comment"));
  }
}

export async function getPostCommentsOnOffsetCtrl(
  prisma: PrismaClient,
  params: IOffsetQueryParams & { postId: string }
) {
  try {
    await offsetQueryParamsSchema.validate(_.omit(params, ["postId"]), {
      abortEarly: false,
    });

    const { postId, limit, page } = params;

    const isPostExist = await getPostById(prisma, postId);

    if (!isPostExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }

    const count = await countCommentsForPost(prisma, postId);
    if (count === 0) {
      return { data: [], total: count };
    }

    const result = await getCommentsOnOffset(prisma, count, page, limit, {
      orderBy: { updatedAt: "desc" },
      where: { postId },
    });
    return result;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("comments"));
  }
}
