import { GraphQLError } from "graphql";

import type { User as IUser } from "@prisma/client";

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
    try {
      const image = await prisma.picture.findFirst({ where: { userId: id } });

      return image;
    } catch (error) {
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Avatar", "user"),
      );
    }
  },

  async posts({ id }: IUser, _: unknown, { prisma }: YogaContext, __: unknown) {
    try {
      const posts = await prisma.post.findMany({ where: { authorId: id } });
      return posts;
    } catch (error) {
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Posts", "user"),
      );
    }
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
