import { GraphQLYogaError } from "@graphql-yoga/node";
import {
  authorFollowersOnCursorCtrl,
  authorFollowingsOnCursorCtrl,
  getUsersOnOffsetCtrl,
  suggestAuthorsToUserOnOffsetCtrl,
} from "../../controller/user.controller";
import { getUserById } from "../../services/user.service";
import {
  NOT_EXIST_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "../../utils/constants";
import { ICursorQueryParams, IOffsetQueryParams } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";
import { getGraphqlYogaError } from "../../validations";

export const Query = {
  async users(_: unknown, __: unknown, { prisma }: YogaContextReturnType) {
    const u = await prisma.user.findMany();
    return u;
  },

  async usersOnOffset(
    _: any,
    params: IOffsetQueryParams,
    { prisma, user }: YogaContextReturnType
  ) {
    const result = await getUsersOnOffsetCtrl(prisma, params, user?.id);
    return result;
  },

  async suggestAuthorsToUserOnOffset(
    _: any,
    params: IOffsetQueryParams,
    { prisma, user }: YogaContextReturnType
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }
    const result = await suggestAuthorsToUserOnOffsetCtrl(
      prisma,
      params,
      user.id
    );
    return result;
  },

  async authorFollowersOnCursor(
    _: any,
    { authorId, ...rest }: ICursorQueryParams & { authorId?: string },
    { prisma, user }: YogaContextReturnType
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }
    const result = await authorFollowersOnCursorCtrl(
      prisma,
      rest,
      authorId || user.id
    );
    return result;
  },

  async authorFollowingsOnCursor(
    _: any,
    { authorId, ...rest }: ICursorQueryParams & { authorId?: string },
    { prisma, user }: YogaContextReturnType
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }
    const result = await authorFollowingsOnCursorCtrl(
      prisma,
      rest,
      authorId || user.id
    );
    return result;
  },

  async user(
    _: unknown,
    { id }: { id: string },
    { prisma }: YogaContextReturnType
  ) {
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
};
