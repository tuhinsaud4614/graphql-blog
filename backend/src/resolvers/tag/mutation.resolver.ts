import { type GraphQLResolveInfo } from "graphql";

import { AuthenticationError } from "@/model";
import {
  tagCreationService,
  tagDeletionService,
  tagModificationService,
} from "@/services/tag";
import { UN_AUTH_ERR_MSG, generateRoleErrorMessage } from "@/utils/constants";
import type {
  IDParams,
  TagCreationParams,
  TagModificationParams,
  YogaContext,
} from "@/utils/types";

export const Mutation = {
  async createTag(
    _: unknown,
    params: TagCreationParams,
    { prisma, user }: YogaContext,
    _info: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    const result = await tagCreationService(prisma, params);
    return result;
  },
  async updateTag(
    _: unknown,
    params: TagModificationParams,
    { prisma, user }: YogaContext,
    _info: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    return await tagModificationService(prisma, params);
  },

  async deleteTag(
    _: unknown,
    params: IDParams,
    { prisma, user }: YogaContext,
    _info: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    const result = await tagDeletionService(prisma, params);
    return result;
  },
};
