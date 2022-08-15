import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import {
  createCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} from "../../controller/comment.controller";
import { UN_AUTH_ERR_MSG, UN_AUTH_EXT_ERR_CODE } from "../../utils/constants";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async createComment(
    _: any,
    {
      data: { content, postId, parentComment },
    }: { data: { parentComment?: string; postId: string; content: string } },
    { prisma, user }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    const result = await createCommentCtrl(
      prisma,
      postId,
      content,
      user,
      parentComment
    );
    return result;
  },

  async updateComment(
    _: any,
    {
      data: { content, commentId },
    }: { data: { commentId: string; content: string } },
    { prisma, user }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    const result = await updateCommentCtrl(prisma, commentId, content, user);
    return result;
  },

  async deleteComment(
    _: any,
    { commentId }: { commentId: string },
    { prisma, user }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    const result = await deleteCommentCtrl(prisma, commentId, user);
    return result;
  },
};
