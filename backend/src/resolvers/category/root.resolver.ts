import { GraphQLYogaError } from "@graphql-yoga/node";
import logger from "../../logger";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { ICategory } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Category = {
  async posts(
    { id }: ICategory,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
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
      throw new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
};
