import {
  postCommentsCountCtrl,
  postReactionsByCtrl,
  postReactionsCountCtrl,
} from "@/controller/post.controller";
import { AuthenticationError } from "@/model";
import {
  followingAuthorPostsService,
  postByIdService,
  postsByTagWithOffsetService,
  postsWithCursorService,
  postsWithOffsetService,
  trendingPostsService,
} from "@/services/post";
import type {
  CursorParams,
  OffsetParams,
  PostsByTagOffsetParams,
  YogaContext,
} from "@/utils/types";

export const Query = {
  async postsWithOffset(
    _: unknown,
    params: OffsetParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    const result = await postsWithOffsetService(prisma, params);
    return result;
  },
  async postsWithCursor(
    _: unknown,
    params: CursorParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await postsWithCursorService(prisma, params);
  },
  async followingAuthorPosts(
    _: unknown,
    params: CursorParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await followingAuthorPostsService(prisma, params, user.id);
  },
  async post(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await postByIdService(prisma, id);
  },
  async trendingPosts(
    _: unknown,
    __: unknown,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await trendingPostsService(prisma);
  },
  async postsByTagWithOffset(
    _: unknown,
    params: PostsByTagOffsetParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await postsByTagWithOffsetService(prisma, params);
  },

  async postReactionsCount(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postReactionsCountCtrl(prisma, user.id, id);
    return result;
  },

  async postCommentsCount(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postCommentsCountCtrl(prisma, id);
    return result;
  },

  async postReactionsBy(
    _: unknown,
    { id, ...rest }: { id: string } & CursorParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postReactionsByCtrl(prisma, id, rest);
    return result;
  },
};
