import type { Bookmark as IBookmark } from "@prisma/client";

import logger from "@/logger";
import { UnknownError } from "@/model";
import { getPostById } from "@/repositories/post";
import { getUserById } from "@/repositories/user";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import type { YogaContext } from "@/utils/types";

export const Bookmark = {
  async user(
    { id }: IBookmark,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getUserById(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("User", "bookmark"),
      );
    }
  },

  async post(
    { id }: IBookmark,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getPostById(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("Post", "bookmark"),
      );
    }
  },
};
