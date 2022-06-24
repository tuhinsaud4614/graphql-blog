import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { IPost } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Post = {
  async author(
    { authorId }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const author = await prisma.user.findFirst({
        where: { id: authorId },
      });

      return author;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
  async categories(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const categories = await prisma.category.findMany({
        where: { posts: { every: { id } } },
      });

      return categories;
    } catch (error) {
      console.log(error);

      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
  async tags(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const categories = await prisma.tag.findMany({
        where: { posts: { every: { id } } },
      });

      return categories;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
  async images(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const categories = await prisma.picture.findMany({
        where: { postId: id },
      });

      return categories;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Posts", "user"));
    }
  },
};
