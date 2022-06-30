import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { IComment } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

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
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const comments = await prisma.comment
        .findUnique({
          where: { id },
        })
        .replies();
      return comments;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Commenter", "user"));
    }
  },
};
