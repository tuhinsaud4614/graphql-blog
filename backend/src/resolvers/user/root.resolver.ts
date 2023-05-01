import { GraphQLError } from "graphql";

import type { User as IUser } from "@prisma/client";

import { userAvatarService, userPostsService } from "@/services/user";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { YogaContext } from "@/utils/types";

export const User = {
  password() {
    return null;
  },
  async avatar(
    { id }: IUser,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    return await userAvatarService(prisma, id);
  },

  async posts({ id }: IUser, _: unknown, { prisma }: YogaContext, __: unknown) {
    return await userPostsService(prisma, id);
  },

  async followings(
    { id }: IUser,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      const users = await prisma.user
        .findUnique({
          where: { id },
        })
        .followings();
      return users;
    } catch (error) {
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Followings", "user"),
      );
    }
  },

  async followers(
    { id }: IUser,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      const users = await prisma.user
        .findUnique({
          where: { id },
        })
        .followers();
      return users;
    } catch (error) {
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Followers", "user"),
      );
    }
  },
};
