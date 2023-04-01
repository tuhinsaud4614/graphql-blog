import { GraphQLYogaError } from "@graphql-yoga/node";

import logger from "@/logger";
import { UnknownError } from "@/model";
import { getReplyCount } from "@/services/comment.service";
import { NOT_EXIST_FOR_ERR_MSG } from "@/utils/constants";
import { IComment } from "@/utils/interfaces";
import { YogaContextReturnType } from "@/utils/types";

export const Comment = {
  async commenter(
    { id }: IComment,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const user = await prisma.comment
        .findUnique({ where: { id } })
        .commenter();
      return user;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Commenter", "user"));
    }
  },
  async parentComment(
    { id }: IComment,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const comment = await prisma.comment
        .findUnique({ where: { id } })
        .parentComment();
      return comment;
    } catch (error) {
      return new GraphQLYogaError(
        NOT_EXIST_FOR_ERR_MSG("Parent comment", "user")
      );
    }
  },
  async replies(
    { id }: IComment,
    _: unknown,
    { prisma }: YogaContextReturnType,
    __: any
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
