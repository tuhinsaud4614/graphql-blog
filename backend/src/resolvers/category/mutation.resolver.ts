import { type GraphQLResolveInfo } from "graphql";

import { AuthenticationError } from "@/model";
import {
  categoryCreationService,
  categoryDeletionService,
  categoryModificationService,
} from "@/services/category";
import { UN_AUTH_ERR_MSG, generateRoleErrorMessage } from "@/utils/constants";
import {
  CategoryCreationParams,
  CategoryModificationParams,
  IDParams,
  YogaContext,
} from "@/utils/types";

export const Mutation = {
  async createCategory(
    _: unknown,
    params: CategoryCreationParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    const result = await categoryCreationService(prisma, params);
    return result;
  },

  async updateCategory(
    _: any,
    params: CategoryModificationParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    return await categoryModificationService(prisma, params);
  },

  async deleteCategory(
    _: any,
    params: IDParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    const result = await categoryDeletionService(prisma, params);
    return result;
  },
};
