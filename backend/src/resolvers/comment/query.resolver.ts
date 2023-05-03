import { AuthenticationError } from "@/model";
import {
  getPostCommentsWithCursorService,
  postCommentsWithOffsetService,
} from "@/services/comment";
import type {
  PostCommentsCursorParams,
  PostCommentsParams,
  YogaContext,
} from "@/utils/types";

export const Query = {
  async postCommentsWithOffset(
    _: unknown,
    params: PostCommentsParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postCommentsWithOffsetService(prisma, params);
    return result;
  },
  async postCommentsWithCursor(
    _: unknown,
    params: PostCommentsCursorParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    return await getPostCommentsWithCursorService(prisma, params);
  },
};
