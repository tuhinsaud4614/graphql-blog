import { type GraphQLResolveInfo } from "graphql";

import { reactionToCtrl } from "@/controller/post.controller";
import { AuthenticationError, ForbiddenError } from "@/model";
import {
  postCreationService,
  postDeletionService,
  postModificationService,
} from "@/services/post";
import { VERIFIED_AUTHOR_ERR_MSG } from "@/utils/constants";
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
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await postDeletionService(prisma, id, user.id);
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
