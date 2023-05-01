import { AuthenticationError } from "@/model";
import {
  authorFollowersWithCursorService,
  authorFollowingsWithCursorService,
  suggestAuthorsWithOffsetService,
  tokenService,
  userFollowService,
  userFollowersService,
  userFollowingsService,
  userResultService,
  userService,
  usersWithOffsetService,
} from "@/services/user";
import { UN_AUTH_ERR_MSG, generateRoleErrorMessage } from "@/utils/constants";
import {
  AuthorIdWithCursorParams,
  OffsetParams,
  YogaContext,
} from "@/utils/types";

export const Query = {
  async token(
    _: unknown,
    { refreshToken }: { refreshToken?: string },
    { prisma, req }: YogaContext,
  ) {
    return await tokenService(prisma, refreshToken || req.cookies?.jwt);
  },

  async usersWithOffset(
    _: unknown,
    params: OffsetParams,
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.role !== "ADMIN") {
      return new AuthenticationError(generateRoleErrorMessage("admin"));
    }

    return await usersWithOffsetService(prisma, params, user.id);
  },

  async recommendAuthorsWithOffset(
    _: unknown,
    params: OffsetParams,
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await suggestAuthorsWithOffsetService(prisma, params, user.id);
  },

  async authorFollowersWithCursor(
    _: unknown,
    { authorId, ...rest }: AuthorIdWithCursorParams,
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await authorFollowersWithCursorService(prisma, {
      ...rest,
      authorId: authorId || user.id,
    });
  },
  async authorFollowingsWithCursor(
    _: unknown,
    { authorId, ...rest }: AuthorIdWithCursorParams,
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await authorFollowingsWithCursorService(prisma, {
      ...rest,
      authorId: authorId || user.id,
    });
  },

  async user(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await userService(prisma, id);
  },

  async userResult(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
  ) {
    return await userResultService(prisma, id, user?.id);
  },

  async userFollow(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
  ) {
    return await userFollowService(prisma, id);
  },

  async userFollowers(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
  ) {
    return await userFollowersService(prisma, id);
  },

  async userFollowings(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
  ) {
    return await userFollowingsService(prisma, id);
  },
};
