import { GraphQLYogaError } from "@graphql-yoga/node";

import { GraphQLResolveInfo } from "graphql";

import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} from "../../controller/category.controller";
import {
  ROLE_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
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
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    if (user.role !== EUserRole.Admin) {
      return new GraphQLYogaError(ROLE_ERR_MSG("admin"));
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
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    if (user.role !== EUserRole.Admin) {
      return new GraphQLYogaError(ROLE_ERR_MSG("admin"));
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
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    if (user.role !== EUserRole.Admin) {
      return new GraphQLYogaError(ROLE_ERR_MSG("admin"));
    }

    const result = await deleteCategoryCtrl(prisma, id);
    return result;
  },
};
