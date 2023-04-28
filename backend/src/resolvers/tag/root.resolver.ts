import { GraphQLError } from "graphql";

import { Tag as ITag } from "@prisma/client";

import logger from "@/logger";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import type { YogaContext } from "@/utils/types";

export const Tag = {
  async posts({ id }: ITag, _: unknown, { prisma }: YogaContext, __: unknown) {
    try {
      const posts = await prisma.tag
        .findUnique({
          where: { id },
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
