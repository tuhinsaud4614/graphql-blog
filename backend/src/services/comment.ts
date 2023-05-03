import { PrismaClient } from "@prisma/client";

import logger from "@/logger";
import { NoContentError, UnknownError } from "@/model";
import {
  createComment,
  createReply,
  getCommentById,
} from "@/repositories/comment";
import { getPostById } from "@/repositories/post";
import { formatError } from "@/utils";
import {
  generateCreationErrorMessage,
  generateNotExistErrorMessage,
} from "@/utils/constants";
import type { CreateCommentInput } from "@/utils/types";
import { createCommentSchema } from "@/validations/comment";

export async function commentCreationService(
  prisma: PrismaClient,
  userId: string,
  params: CreateCommentInput,
) {
  try {
    await createCommentSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "comment creation" });
  }

  try {
    const { content, parentId, postId } = params;

    // If parent comment is valid thats means it's a reply
    if (parentId) {
      const parent = await getCommentById(prisma, parentId);
      if (!parent) {
        return new NoContentError(generateNotExistErrorMessage("Comment"));
      }

      return await createReply(prisma, {
        commenterId: userId,
        content,
        parentId,
      });
    }

    const isExist = await getPostById(prisma, postId);
    if (!isExist) {
      return new NoContentError(generateNotExistErrorMessage("Post"));
    }

    return await createComment(prisma, {
      postId: isExist.id,
      commenterId: userId,
      content,
    });
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateCreationErrorMessage("Comment"));
  }
}
