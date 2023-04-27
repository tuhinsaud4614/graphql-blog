import { GraphQLError } from "graphql";

import logger from "@/logger";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import type { YogaContext } from "@/utils/types";
import { Tag as ITag } from "@prisma/client";

export const Tag = {
  async posts({ id }: ITag, _: unknown, { prisma }: YogaContext, __: unknown) {
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
