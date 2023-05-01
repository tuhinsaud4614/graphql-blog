import type { GraphQLResolveInfo } from "graphql";

import {
  createCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import type { YogaContext } from "@/utils/types";

export const Mutation = {
  async createComment(
    _: unknown,
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
    _: unknown,
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
    _: unknown,
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
