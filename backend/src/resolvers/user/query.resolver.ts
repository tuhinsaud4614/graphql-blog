import { GraphQLYogaError } from "@graphql-yoga/node";

import {
  authorFollowersOnCursorCtrl,
  authorFollowingsOnCursorCtrl,
  getUsersOnOffsetCtrl,
  suggestAuthorsToUserOnOffsetCtrl,
  tokenCtrl,
  userFollowCtrl,
  userFollowersCtrl,
  userFollowingsCtrl,
  userResultCtrl,
} from "@/controller/user.controller";
import { getUserById } from "@/services/user.service";
import {
  NOT_EXIST_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "@/utils/constants";
import { CursorParams, OffsetParams } from "@/utils/interfaces";
import { YogaContext } from "@/utils/types";
import { getGraphqlYogaError } from "@/validations";

export const Query = {
  async token(
    _: any,
    { refreshToken }: { refreshToken?: string },
    { prisma, req }: YogaContext,
  ) {
    // @ts-ignore
    refreshToken ||= req.cookies?.jwt;

    const result = await tokenCtrl(prisma, refreshToken);
    return result;
  },

  async users(_: unknown, __: unknown, { prisma }: YogaContext) {
    const u = await prisma.user.findMany();
    return u;
  },

  async usersOnOffset(
    _: any,
    params: OffsetParams,
    { prisma, user }: YogaContext,
  ) {
    const result = await getUsersOnOffsetCtrl(prisma, params, user?.id);
    return result;
  },

  async suggestAuthorsToUserOnOffset(
    _: any,
    params: OffsetParams,
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }
    const result = await suggestAuthorsToUserOnOffsetCtrl(
      prisma,
      params,
      user.id,
    );
    return result;
  },

  async authorFollowersOnCursor(
    _: any,
    { authorId, ...rest }: CursorParams & { authorId?: string },
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }
    const result = await authorFollowersOnCursorCtrl(
      prisma,
      rest,
      authorId || user.id,
    );
    return result;
  },

  async authorFollowingsOnCursor(
    _: any,
    { authorId, ...rest }: CursorParams & { authorId?: string },
    { prisma, user }: YogaContext,
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
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
        return new GraphQLYogaError(NOT_EXIST_ERR_MSG("User"));
      }
      return user;
    } catch (error) {
      return getGraphqlYogaError(error, NOT_EXIST_ERR_MSG("User"));
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
