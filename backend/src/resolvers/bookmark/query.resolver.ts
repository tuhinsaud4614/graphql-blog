import { AuthenticationError } from "@/model";
import {
  bookmarkCountService,
  isBookmarkedService,
  userBookmarksWithCursorService,
  userBookmarksWithOffsetService,
} from "@/services/bookmark";
import type { CursorParams, OffsetParams, YogaContext } from "@/utils/types";

export const Query = {
  async userBookmarksWithOffset(
    _: unknown,
    params: OffsetParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await userBookmarksWithOffsetService(prisma, user.id, params);
  },

  async userBookmarksWithCursor(
    _: unknown,
    params: CursorParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await userBookmarksWithCursorService(prisma, user.id, params);
  },

  async bookmarkCount(
    _: unknown,
    __: unknown,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await bookmarkCountService(prisma);
  },

  async isBookmarked(
    _: unknown,
    { postId }: { postId: string },
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const isBookmarked = await isBookmarkedService(prisma, postId, user.id);
    return !!isBookmarked;
  },
};
