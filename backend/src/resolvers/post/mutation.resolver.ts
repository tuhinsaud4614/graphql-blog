import { type GraphQLResolveInfo } from "graphql";

import { AuthenticationError, ForbiddenError } from "@/model";
import {
  createUntitledPostService,
  postCreationService,
  postDeletionService,
  postModificationService,
  publishPostService,
  toggleReactionToPostService,
  updatePostDraftService,
} from "@/services/post";
import { VERIFIED_AUTHOR_ERR_MSG } from "@/utils/constants";
import type {
  CreatePostInput,
  PublishPostInput,
  UpdatePostDraftInput,
  UpdatePostInput,
  YogaContext,
} from "@/utils/types";

export const Mutation = {
  async createUntitledPost(
    _: unknown,
    __: unknown,
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await createUntitledPostService(prisma, user.id);
  },
  async updateDraft(
    _: unknown,
    { data }: { data: UpdatePostDraftInput },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await updatePostDraftService(prisma, data, user.id);
  },
  async publishPost(
    _: unknown,
    { data }: { data: PublishPostInput },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    if (user.role === "AUTHOR" && user.authorStatus !== "VERIFIED") {
      return new ForbiddenError(VERIFIED_AUTHOR_ERR_MSG);
    }

    return await publishPostService(prisma, data, user.id);
  },
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
    return await toggleReactionToPostService(prisma, pubSub, toId, user);
  },
};
