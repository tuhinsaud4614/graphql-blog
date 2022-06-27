import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { IUser } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const User = {
  password() {
    return null;
  },
  async avatar(
    { id }: IUser,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const image = await prisma.picture.findFirst({ where: { userId: id } });

      return image;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Avatar", "user"));
    }
  },

  async posts(
    { id }: IUser,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const posts = await prisma.post.findMany({ where: { authorId: id } });
      return posts;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },

  async following(
    { id }: IUser,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const users = await prisma.user.findMany({
        where: { followers: { some: { id } } },
      });
      return users;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Followings", "user"));
    }
  },

  async followers(
    { id }: IUser,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const users = await prisma.user.findMany({
        where: { following: { some: { id } } },
      });
      return users;
    } catch (error) {
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Follower", "user"));
    }
  },
};
