import { GraphQLError } from "graphql";

import logger from "@/logger";
import { NOT_EXIST_FOR_ERR_MSG } from "@/utils/constants";
import { ICategory } from "@/utils/interfaces";
import { YogaContext } from "@/utils/types";

export const Category = {
  async posts(
    { id }: ICategory,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      const posts = await prisma.category
        .findFirst({
          where: { id },
        })
        .posts();
      return posts;
    } catch (error) {
      logger.error(error);
      throw new GraphQLError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
};
