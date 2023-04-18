import { GraphQLError } from "graphql";

import { Prisma, PrismaClient } from "@prisma/client";
import _ from "lodash";

import logger from "@/logger";
import { NoContentError } from "@/model";
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
} from "@/services/comment.service";
import { getPostById } from "@/services/post.service";
import {
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import { IUserPayload } from "@/utils/interfaces";
import { CursorParams, OffsetParams } from "@/utils/types";
import {
  cursorParamsSchema,
  getGraphqlYogaError,
  offsetParamsSchema,
} from "@/validations";
import { createCommentSchema } from "@/validations/comment.validation";

export async function createCommentCtrl(
  prisma: PrismaClient,
  postId: string,
  content: string,
  user: IUserPayload,
  parentComment?: string,
) {
  try {
    await createCommentSchema.validate(
      { postId, content, parentComment },
      { abortEarly: false },
    );

    // If parent comment is valid thats means it's a reply
    if (parentComment) {
      const parent = await getCommentById(prisma, parentComment);

      if (!parent) {
        return new GraphQLError(generateNotExistErrorMessage("Comment"));
      }

      const comment = await createReply(prisma, parent.id, user.id, content);
      return comment;
    }

    const isExist = await getPostById(prisma, postId);
    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Post"));
    }

    const comment = await createComment(prisma, isExist.id, user.id, content);

    return comment;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateCreationErrorMessage("Comment"));
  }
}

export async function updateCommentCtrl(
  prisma: PrismaClient,
  commentId: string,
  content: string,
  user: IUserPayload,
) {
  try {
    const isExist = await getCommentForUser(prisma, commentId, user.id);
    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Comment or Reply"));
    }

    if (isExist.content === content) {
      return isExist;
    }

    const comment = await updateComment(prisma, commentId, content);
    return comment;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateUpdateErrorMessage("Comment"));
  }
}

export async function deleteCommentCtrl(
  prisma: PrismaClient,
  commentId: string,
  user: IUserPayload,
) {
  try {
    const isExist = await getCommentForUser(prisma, commentId, user.id);

    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Comment or Reply"));
    }

    const comment = await deleteComment(prisma, commentId);
    return comment.id;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateDeleteErrorMessage("Comment"));
  }
}

export async function getPostCommentsOnOffsetCtrl(
  prisma: PrismaClient,
  params: OffsetParams & { postId: string },
) {
  try {
    await offsetParamsSchema.validate(_.omit(params, ["postId"]), {
      abortEarly: false,
    });

    const { postId, limit, page } = params;

    const isPostExist = await getPostById(prisma, postId);

    if (!isPostExist) {
      return new GraphQLError(generateNotExistErrorMessage("Post"));
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
    return getGraphqlYogaError(error, generateCreationErrorMessage("comments"));
  }
}

export async function getPostCommentsOnCursorCtrl(
  prisma: PrismaClient,
  {
    postId,
    parentId,
    ...rest
  }: CursorParams & { postId: string; parentId?: string },
) {
  try {
    await cursorParamsSchema.validate(rest, { abortEarly: false });

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
        count,
      );
      return result;
    }

    const isPostExist = await getPostById(prisma, postId);

    if (!isPostExist) {
      return new NoContentError(generateNotExistErrorMessage("Post"));
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
    return getGraphqlYogaError(error, generateCreationErrorMessage("comments"));
  }
}
