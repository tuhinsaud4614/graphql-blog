import type { User as IUser } from "@prisma/client";

import {
  userAvatarService,
  userFollowByService,
  userFollowersService,
  userPostsService,
} from "@/services/user";
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
    return await userFollowByService(prisma, id);
  },

  async followers(
    { id }: IUser,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    return userFollowersService(prisma, id);
  },
};
