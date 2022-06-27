import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { IComment } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Comment = {
  async commenter(
    { commenterId }: IComment,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const user = await prisma.user.findFirst({ where: { id: commenterId } });
      return user;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Commenter", "user"));
    }
  },
  async replies(
    { id }: IComment,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const comments = await prisma.comment.findFirst({
        where: { parentCommentId: id },
      });
      return comments;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Commenter", "user"));
    }
  },
};
