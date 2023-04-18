import { GraphQLError } from "graphql";

import {
  getAllPostsByTagCtrl,
  getAllPostsCtrl,
  getAllPostsOnOffsetCtrl,
  getFollowingAuthorPostsCtrl,
  getTrendingPostsCtrl,
  postCommentsCountCtrl,
  postReactionsByCtrl,
  postReactionsCountCtrl,
} from "@/controller/post.controller";
import logger from "@/logger";
import { AuthenticationError } from "@/model";
import { getPostById } from "@/services/post.service";
import { NOT_EXIST_ERR_MSG } from "@/utils/constants";
import type {
  CursorParams,
  OffsetParams,
  TaggedPostCursorParams,
  YogaContext,
} from "@/utils/types";

export const Query = {
  async postsOnOffset(
    _: any,
    params: OffsetParams,
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await getAllPostsOnOffsetCtrl(prisma, params);
    return result;
  },
  async posts(_: any, params: CursorParams, { prisma }: YogaContext, ___: any) {
    const result = await getAllPostsCtrl(prisma, params);
    return result;
  },
  async followingAuthorPosts(
    _: any,
    params: CursorParams,
    { prisma, user }: YogaContext,
    ___: any,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await getFollowingAuthorPostsCtrl(prisma, params, user.id);
    return result;
  },
  async post(
    _: any,
    { id }: { id: string },
    { prisma }: YogaContext,
    ___: any,
  ) {
    try {
      const result = await getPostById(prisma, id);

      return result;
    } catch (error: any) {
      logger.error(error);
      return new GraphQLError(NOT_EXIST_ERR_MSG("Post"));
    }
  },
  async trendingPosts(_: any, __: any, { prisma }: YogaContext, ___: any) {
    const result = await getTrendingPostsCtrl(prisma);
    return result;
  },

  async tagPosts(
    _: any,
    params: TaggedPostCursorParams,
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await getAllPostsByTagCtrl(prisma, params);
    return result;
  },

  async postReactionsCount(
    _: any,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    ___: any,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postReactionsCountCtrl(prisma, user.id, id);
    return result;
  },

  async postCommentsCount(
    _: any,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    ___: any,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postCommentsCountCtrl(prisma, id);
    return result;
  },

  async postReactionsBy(
    _: any,
    { id, ...rest }: { id: string } & CursorParams,
    { prisma, user }: YogaContext,
    ___: any,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await postReactionsByCtrl(prisma, id, rest);
    return result;
  },
};
