import type { GraphQLResolveInfo } from "graphql";

import {
  deleteCommentCtrl,
  updateCommentCtrl,
} from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import { commentCreationService } from "@/services/comment";
import type { CreateCommentInput, YogaContext } from "@/utils/types";

export const Mutation = {
  async createComment(
    _: unknown,
    { data }: { data: CreateCommentInput },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    return await commentCreationService(prisma, user.id, data);
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
