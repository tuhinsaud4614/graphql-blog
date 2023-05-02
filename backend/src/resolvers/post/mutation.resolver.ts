import { GraphQLError, type GraphQLResolveInfo } from "graphql";

import { deletePostCtrl, reactionToCtrl } from "@/controller/post.controller";
import { AuthenticationError, ForbiddenError } from "@/model";
import { postCreationService, postModificationService } from "@/services/post";
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
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await postCreationService(prisma, data, user.id);
  },

  async updatePost(
    _: unknown,
    { data }: { data: UpdatePostInput },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await postModificationService(prisma, data, user.id);
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
