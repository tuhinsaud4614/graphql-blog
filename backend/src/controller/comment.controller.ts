import { GraphQLYogaError } from "@graphql-yoga/node";
import { Prisma, PrismaClient } from "@prisma/client";
import _ from "lodash";
import logger from "../logger";
import { NoContentError } from "../model";
import {
  countCommentsForPost,
  countReplies,
  createComment,
  createReply,
  deleteComment,
  getCommentById,
  getCommentForUser,
  getCommentsOnCursor,
  getCommentsOnOffset,
  getCommentsRepliesOnCursor,
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
import {
  ICursorQueryParams,
  IOffsetQueryParams,
  IUserPayload,
} from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { createCommentSchema } from "../validations/comment.validation";
import {
  cursorQueryParamsSchema,
  offsetQueryParamsSchema,
} from "../validations/post.validation";

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
      const parent = await getCommentById(prisma, parentComment);

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

export async function getPostCommentsOnCursorCtrl(
  prisma: PrismaClient,
  {
    postId,
    parentId,
    ...rest
  }: ICursorQueryParams & { postId: string; parentId?: string }
) {
  try {
    await cursorQueryParamsSchema.validate(rest, { abortEarly: false });

    if (parentId) {
      const count = await countReplies(prisma, parentId);
      if (count === 0) {
        return {
          total: count,
          pageInfo: {
            hasNext: false,
            endCursor: null,
          },
          edges: [],
        };
      }

      const result = await getCommentsRepliesOnCursor(
        prisma,
        rest,
        parentId,
        count
      );
      return result;
    }

    const isPostExist = await getPostById(prisma, postId);

    if (!isPostExist) {
      return new NoContentError(NOT_EXIST_ERR_MSG("Post"));
    }

    const args: Prisma.CommentFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: { postId },
    };

    const count = await countCommentsForPost(prisma, postId);
    if (count === 0) {
      return {
        total: count,
        pageInfo: {
          hasNext: false,
          endCursor: null,
        },
        edges: [],
      };
    }

    const result = await getCommentsOnCursor(prisma, rest, args, count);
    return result;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("comments"));
  }
}
