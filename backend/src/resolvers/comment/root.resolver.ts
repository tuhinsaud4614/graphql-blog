import type { Comment as IComment } from "@prisma/client";

import logger from "@/logger";
import { UnknownError } from "@/model";
import {
  getCommenter,
  getParentComment,
  getReplyCount,
} from "@/repositories/comment";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import type { YogaContext } from "@/utils/types";

export const Comment = {
  async commenter(
    { id }: IComment,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getCommenter(prisma, id);
    } catch (error) {
      return new UnknownError(
        generateEntityNotExistErrorMessage("Commenter", "user"),
      );
    }
  },
  async parentComment(
    { id }: IComment,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getParentComment(prisma, id);
    } catch (error) {
      return new UnknownError(
        generateEntityNotExistErrorMessage("Parent comment", "user"),
      );
    }
  },
  async replies(
    { id }: IComment,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      const count = await getReplyCount(prisma, id);
      return count?._count.replies ?? 0;
    } catch (error) {
      logger.error(error);
      return new UnknownError(`Something went wrong for comment:${id} replies`);
    }
  },
};
