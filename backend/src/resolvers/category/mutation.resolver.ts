import { GraphQLError, GraphQLResolveInfo } from "graphql";

import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} from "../../controller/category.controller";
import {
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  generateRoleErrorMessage,
} from "../../utils/constants";
import { EUserRole } from "../../utils/enums";
import { YogaContext } from "../../utils/types";

export const Mutation = {
  async createCategory(
    _: any,
    { title }: { title: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.role !== EUserRole.Admin) {
      return new GraphQLError(generateRoleErrorMessage("admin"));
    }

    const result = await createCategoryCtrl(prisma, title);
    return result;
  },

  async updateCategory(
    _: any,
    { id, title }: { id: string; title: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.role !== EUserRole.Admin) {
      return new GraphQLError(generateRoleErrorMessage("admin"));
    }

    const result = await updateCategoryCtrl(prisma, id, title);
    return result;
  },

  async deleteCategory(
    _: any,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.role !== EUserRole.Admin) {
      return new GraphQLError(generateRoleErrorMessage("admin"));
    }

    const result = await deleteCategoryCtrl(prisma, id);
    return result;
  },
};
