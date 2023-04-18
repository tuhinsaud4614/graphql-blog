import { GraphQLResolveInfo } from "graphql";

import {
  createCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import { YogaContext } from "@/utils/types";

export const Mutation = {
  async createComment(
    _: any,
    {
      data: { content, postId, parentComment },
    }: { data: { parentComment?: string; postId: string; content: string } },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    const result = await createCommentCtrl(
      prisma,
      postId,
      content,
      user,
      parentComment,
    );
    return result;
  },

  async updateComment(
    _: any,
    {
      data: { content, commentId },
    }: { data: { commentId: string; content: string } },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    const result = await updateCommentCtrl(prisma, commentId, content, user);
    return result;
  },

  async deleteComment(
    _: any,
    { commentId }: { commentId: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    const result = await deleteCommentCtrl(prisma, commentId, user);
    return result;
  },
};
