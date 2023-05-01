import { GraphQLError, type GraphQLResolveInfo } from "graphql";

import {
  createPostCtrl,
  deletePostCtrl,
  reactionToCtrl,
  updatePostCtrl,
} from "@/controller/post.controller";
import { AuthenticationError } from "@/model";
import {
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  VERIFIED_AUTHOR_ERR_MSG,
} from "@/utils/constants";
import type {
  CreatePostInput,
  UpdatePostInput,
  YogaContext,
} from "@/utils/types";

export const Mutation = {
  async createPost(
    _: unknown,
    { data }: { data: CreatePostInput },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new GraphQLError(VERIFIED_AUTHOR_ERR_MSG);
    }

    const result = await createPostCtrl(prisma, data, user);
    return result;
  },

  async updatePost(
    _: unknown,
    { data }: { data: UpdatePostInput },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new GraphQLError(VERIFIED_AUTHOR_ERR_MSG);
    }

    const result = await updatePostCtrl(prisma, data, user);
    return result;
  },

  async deletePost(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    const result = await deletePostCtrl(prisma, id, user);
    return result;
  },

  async reactionToPost(
    _: unknown,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    const result = await reactionToCtrl(prisma, pubSub, toId, user);
    return result;
  },
};
