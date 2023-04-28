import { GraphQLError } from "graphql";

import type { Comment as IComment } from "@prisma/client";

import logger from "@/logger";
import { UnknownError } from "@/model";
import { getReplyCount } from "@/services/comment.service";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { YogaContext } from "@/utils/types";

export const Comment = {
  async commenter(
    { id }: IComment,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      const user = await prisma.comment
        .findUnique({ where: { id } })
        .commenter();
      return user;
    } catch (error) {
      return new GraphQLError(
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
      const comment = await prisma.comment
        .findUnique({ where: { id } })
        .parentComment();
      return comment;
    } catch (error) {
      return new GraphQLError(
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
      // const comments = await getCommentsRepliesOnCursor(prisma, params, id);
      // return comments;
      // const comments = await prisma.comment
      //   .findUnique({
      //     where: { id },
      //   })
      //   .replies();
      // return comments;
    } catch (error) {
      logger.error(error);
      return new UnknownError(`Something went wrong for comment:${id} replies`);
    }
  },
};
