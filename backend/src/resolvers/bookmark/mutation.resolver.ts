import type { GraphQLResolveInfo } from "graphql";

import { AuthenticationError } from "@/model";
import {
  bookmarkCreationService,
  bookmarkDeletionService,
  toggleBookmarkService,
} from "@/services/bookmark";
import type { YogaContext } from "@/utils/types";

export const Mutation = {
  async createBookmark(
    _: unknown,
    { postId }: { postId: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await bookmarkCreationService(prisma, user.id, postId);
  },

  async deleteBookmark(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }

    return await bookmarkDeletionService(prisma, id, user.id);
  },
  async toggleBookmark(
    _: unknown,
    { postId }: { postId: string },
    { prisma, user }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError();
    }
    return await toggleBookmarkService(prisma, postId, user.id);
  },
};
