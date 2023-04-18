import { GraphQLError } from "graphql";

import type { Category as ICategory } from "@prisma/client";

import logger from "@/logger";
import { getPostsByCategoryId } from "@/repositories/category";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { YogaContext } from "@/utils/types";

export const Category = {
  async posts(
    { id }: ICategory,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getPostsByCategoryId(prisma, id);
    } catch (error) {
      logger.error(error);
      throw new GraphQLError(
        generateEntityNotExistErrorMessage("Posts", "user"),
      );
    }
  },
};
