import { PrismaClient } from "@prisma/client";

import logger from "@/logger";
import { NoContentError, UnknownError } from "@/model";
import {
  createComment,
  createReply,
  deleteComment,
  getCommentById,
  getCommentForCommenter,
  updateComment,
} from "@/repositories/comment";
import { getPostById } from "@/repositories/post";
import { formatError } from "@/utils";
import {
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import type { CreateCommentInput, UpdateCommentInput } from "@/utils/types";
import {
  createCommentSchema,
  updateCommentSchema,
} from "@/validations/comment";

/**
 * This function creates a comment or a reply to a comment in a database using input validation and
 * error handling.
 * @param {PrismaClient} prisma - An instance of the PrismaClient used to interact with the database.
 * @param {string} userId - The ID of the user who is creating the comment.
 * @param {CreateCommentInput} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns either an error object or the result of creating a comment or reply using the provided
 * parameters and the Prisma client.
 */
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

/**
 * This function modifies a comment in a database using input parameters and validation.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for TypeScript and Node.js that can be used to interact with a database.
 * @param {string} userId - The ID of the user who is trying to modify the comment.
 * @param {UpdateCommentInput} params - The `params` parameter is an object of type
 * `UpdateCommentInput` which contains the following properties:
 * @returns The function `commentModificationService` returns either an error object or the updated
 * comment object.
 */
export async function commentModificationService(
  prisma: PrismaClient,
  userId: string,
  params: UpdateCommentInput,
) {
  try {
    await updateCommentSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "comment modification" });
  }

  try {
    const { content, id } = params;

    const isExist = await getCommentForCommenter(prisma, id, userId);

    if (!isExist) {
      return new NoContentError(
        generateNotExistErrorMessage("Comment or Reply"),
      );
    }

    if (isExist.content === content) {
      return isExist;
    }
    return await updateComment(prisma, params);
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateUpdateErrorMessage("Comment"));
  }
}

/**
 * This function deletes a comment and returns its ID, while also checking if the comment exists and
 * handling errors.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} id - The ID of the comment or reply that needs to be deleted.
 * @param {string} userId - The `userId` parameter is a string representing the ID of the user who is
 * trying to delete a comment.
 * @returns either the ID of the deleted comment or an error object (either a NoContentError or an
 * UnknownError).
 */
export async function commentDeletionService(
  prisma: PrismaClient,
  id: string,
  userId: string,
) {
  try {
    const isExist = await getCommentForCommenter(prisma, id, userId);

    if (!isExist) {
      return new NoContentError(
        generateNotExistErrorMessage("Comment or Reply"),
      );
    }

    const comment = await deleteComment(prisma, id);
    return comment.id;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateDeleteErrorMessage("Comment"));
  }
}
