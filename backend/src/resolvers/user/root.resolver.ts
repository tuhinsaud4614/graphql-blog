import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { IUser } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const User = {
  async avatar(
    { avatarId }: IUser,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      if (!avatarId) {
        return null;
      }
      const image = await prisma.picture.findFirst({ where: { id: avatarId } });
      if (!image) {
        return null;
      }
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
};
