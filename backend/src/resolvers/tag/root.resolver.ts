import type { Tag as ITag } from "@prisma/client";

import logger from "@/logger";
import { UnknownError } from "@/model";
import { getTagPosts } from "@/repositories/tag";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import type { YogaContext } from "@/utils/types";

export const Tag = {
  async posts({ id }: ITag, _: unknown, { prisma }: YogaContext, __: unknown) {
    try {
      return await getTagPosts(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("Posts", "user"),
      );
    }
  },
};
