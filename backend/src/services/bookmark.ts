import type { PrismaClient } from "@prisma/client";

import logger from "@/logger";
import { NoContentError, UnknownError } from "@/model";
import {
  createBookmark,
  deleteBookmark,
  getBookmarkCount,
  getBookmarksByUserId,
  getBookmarksByUserIdWithCursor,
  isBookmarkedPost,
} from "@/repositories/bookmark";
import { getPostById } from "@/repositories/post";
import { generateNotExistErrorMessage } from "@/utils/constants";
import { EToggleMutationStatus } from "@/utils/enums";
import type { CursorParams, OffsetParams } from "@/utils/types";

export const userBookmarksWithOffsetService = async (
  prisma: PrismaClient,
  userId: string,
  params: OffsetParams,
) => {
  const { bookmarks, total } = await getBookmarksByUserId(
    prisma,
    userId,
    params.limit,
    params.page,
  );

  return {
    data: bookmarks,
    total,
    pageInfo: {
      hasNext: params.limit ? total > (params.page ?? 1) * params.limit : false,
      nextPage: params.page ? params.page + 1 : 2,
      previousPage: params.page ? params.page - 1 : 0,
      totalPages: params.limit ? Math.ceil(total / params.limit) : 1,
    },
  };
};

export const userBookmarksWithCursorService = async (
  prisma: PrismaClient,
  userId: string,
  params: CursorParams,
) => {
  return await getBookmarksByUserIdWithCursor(
    prisma,
    userId,
    params.limit,
    params.after,
  );
};

export const bookmarkCountService = async (prisma: PrismaClient) => {
  return await getBookmarkCount(prisma);
};

export const isBookmarkedService = async (
  prisma: PrismaClient,
  postId: string,
  userId: string,
) => {
  return await isBookmarkedPost(prisma, postId, userId);
};

export const bookmarkCreationService = async (
  prisma: PrismaClient,
  userId: string,
  postId: string,
) => {
  return await createBookmark(prisma, userId, postId);
};

export const bookmarkDeletionService = async (
  prisma: PrismaClient,
  id: string,
  userId: string,
) => {
  return await deleteBookmark(prisma, id, userId);
};

export async function toggleBookmarkService(
  prisma: PrismaClient,
  postId: string,
  userId: string,
) {
  let status = EToggleMutationStatus.Added;
  try {
    const isExist = await getPostById(prisma, postId);

    if (!isExist) {
      return new NoContentError(generateNotExistErrorMessage("Post"));
    }

    const isBookmarked = await isBookmarkedPost(prisma, postId, userId);

    if (!isBookmarked) {
      status = EToggleMutationStatus.Added;
      await createBookmark(prisma, postId, userId);
      return EToggleMutationStatus.Added;
    }

    status = EToggleMutationStatus.Removed;
    await deleteBookmark(prisma, postId, userId);

    return EToggleMutationStatus.Removed;
  } catch (error) {
    logger.error(error);
    return new UnknownError(`Bookmark ${status.toString()} request failed.`);
  }
}
