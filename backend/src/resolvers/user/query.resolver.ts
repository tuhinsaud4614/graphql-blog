import { GraphQLError } from "graphql";

import {
  authorFollowingsOnCursorCtrl,
  userFollowCtrl,
  userFollowersCtrl,
  userFollowingsCtrl,
  userResultCtrl,
} from "@/controller/user.controller";
import { AuthenticationError } from "@/model";
import {
  authorFollowersWithCursorService,
  suggestAuthorsWithOffsetService,
  tokenService,
  usersWithOffsetService,
} from "@/services/user";
import { getUserById } from "@/services/user.service";
import {
  UN_AUTH_ERR_MSG,
  generateNotExistErrorMessage,
  generateRoleErrorMessage,
} from "@/utils/constants";
import {
  AuthorFollowersWithCursorParams,
  CursorParams,
  OffsetParams,
  YogaContext,
} from "@/utils/types";
import { getGraphqlYogaError } from "@/validations";

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
    { authorId, ...rest }: AuthorFollowersWithCursorParams,
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
    { authorId, ...rest }: CursorParams & { authorId?: string },
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    const result = await authorFollowingsOnCursorCtrl(
      prisma,
      rest,
      authorId || user.id,
    );
    return result;
  },

  async user(_: unknown, { id }: { id: string }, { prisma }: YogaContext) {
    try {
      const user = await getUserById(prisma, id);
      if (user === null) {
        return new GraphQLError(generateNotExistErrorMessage("User"));
      }
      return user;
    } catch (error) {
      return getGraphqlYogaError(error, generateNotExistErrorMessage("User"));
    }
  },

  async userResult(
    _: unknown,
    { id }: { id: string },
    { prisma, user }: YogaContext,
  ) {
    const result = await userResultCtrl(prisma, id, user?.id);
    return result;
  },

  async userFollow(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
  ) {
    const result = await userFollowCtrl(prisma, id);
    return result;
  },

  async userFollowers(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
  ) {
    const result = await userFollowersCtrl(prisma, id);
    return result;
  },

  async userFollowings(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContext,
  ) {
    const result = await userFollowingsCtrl(prisma, id);
    return result;
  },
};
