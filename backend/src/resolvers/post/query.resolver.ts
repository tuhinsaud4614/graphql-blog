import { GraphQLError } from "graphql";

import {
  getAllPostsByTagCtrl,
  getFollowingAuthorPostsCtrl,
  getTrendingPostsCtrl,
  postCommentsCountCtrl,
  postReactionsByCtrl,
  postReactionsCountCtrl,
} from "@/controller/post.controller";
import logger from "@/logger";
import { AuthenticationError } from "@/model";
import {
  postsWithCursorService,
  postsWithOffsetService,
} from "@/services/post";
import { getPostById } from "@/services/post.service";
import { generateNotExistErrorMessage } from "@/utils/constants";
import type {
  CursorParams,
  OffsetParams,
  TaggedPostCursorParams,
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
    const result = await getFollowingAuthorPostsCtrl(prisma, params, user.id);
    return result;
  },
  async post(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    try {
      const result = await getPostById(prisma, id);

      return result;
    } catch (error: unknown) {
      logger.error(error);
      return new GraphQLError(generateNotExistErrorMessage("Post"));
    }
  },
  async trendingPosts(
    _: unknown,
    __: unknown,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    const result = await getTrendingPostsCtrl(prisma);
    return result;
  },

  async tagPosts(
    _: unknown,
    params: TaggedPostCursorParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    const result = await getAllPostsByTagCtrl(prisma, params);
    return result;
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
