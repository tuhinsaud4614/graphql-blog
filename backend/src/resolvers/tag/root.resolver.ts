import { GraphQLError } from "graphql";

import logger from "@/logger";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { ITag } from "@/utils/interfaces";
import type { YogaContext } from "@/utils/types";

export const Tag = {
  async posts({ id }: ITag, _: any, { prisma }: YogaContext, __: any) {
    try {
      const posts = await prisma.tag
        .findUnique({
          where: { id: id },
        })
        .posts();

      return posts;
    } catch (error) {
      logger.error(error);

      return new GraphQLError(
        generateEntityNotExistErrorMessage("Posts", "user"),
      );
    }
  },
};
