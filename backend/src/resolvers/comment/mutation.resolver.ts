import type { GraphQLResolveInfo } from "graphql";

import { deleteCommentCtrl } from "@/controller/comment.controller";
import { AuthenticationError } from "@/model";
import {
  commentCreationService,
  commentModificationService,
} from "@/services/comment";
import type {
  CreateCommentInput,
  UpdateCommentInput,
  YogaContext,
} from "@/utils/types";

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
    { data }: { data: UpdateCommentInput },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    return await commentModificationService(prisma, user.id, data);
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
