import { GraphQLYogaError } from "@graphql-yoga/node";

import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { IUser } from "@/utils/interfaces";
import { YogaContext } from "@/utils/types";

export const User = {
  password() {
    return null;
  },
  async avatar({ id }: IUser, _: any, { prisma }: YogaContext, __: any) {
    try {
      const image = await prisma.picture.findFirst({ where: { userId: id } });

      return image;
    } catch (error) {
      return new GraphQLYogaError(
        generateEntityNotExistErrorMessage("Avatar", "user"),
      );
    }
  },

  async posts({ id }: IUser, _: any, { prisma }: YogaContext, __: any) {
    try {
      const posts = await prisma.post.findMany({ where: { authorId: id } });
      return posts;
    } catch (error) {
      return new GraphQLYogaError(
        generateEntityNotExistErrorMessage("Posts", "user"),
      );
    }
  },

  async followings({ id }: IUser, _: any, { prisma }: YogaContext, __: any) {
    try {
      const users = await prisma.user
        .findUnique({
          where: { id },
        })
        .followings();
      return users;
    } catch (error) {
      return new GraphQLYogaError(
        generateEntityNotExistErrorMessage("Followings", "user"),
      );
    }
  },

  async followers({ id }: IUser, _: any, { prisma }: YogaContext, __: any) {
    try {
      const users = await prisma.user
        .findUnique({
          where: { id: id },
        })
        .followers();
      return users;
    } catch (error) {
      return new GraphQLYogaError(
        generateEntityNotExistErrorMessage("Followers", "user"),
      );
    }
  },
};
