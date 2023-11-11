import { AuthenticationError } from "@/model";
import {
  followingAuthorPostsService,
  postByIdService,
  postCommentsCountService,
  postCountService,
  postReactedByService,
  postReactionsCountService,
  postsByTagWithOffsetService,
  postsWithCursorService,
  postsWithOffsetService,
  trendingPostsService,
} from "@/services/post";
import type {
  CursorParams,
  OffsetParams,
  PostReactedByCursorParams,
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

    return await postReactionsCountService(prisma, user.id, id);
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

    return await postCommentsCountService(prisma, id);
  },

  async postReactedBy(
    _: unknown,
    params: PostReactedByCursorParams,
    { prisma, user }: YogaContext,
    ___: unknown,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await postReactedByService(prisma, params);
  },
  async postCount(
    _: unknown,
    __: unknown,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await postCountService(prisma);
  },
};
