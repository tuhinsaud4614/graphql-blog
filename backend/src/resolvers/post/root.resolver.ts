import { GraphQLYogaError } from "@graphql-yoga/node";
import { NOT_EXIST_FOR_ERR_MSG } from "../../utils/constants";
import { IPost } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Post = {
  async author(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const author = await prisma.post
        .findUnique({
          where: { id },
        })
        .author();

      return author;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("User", "post"));
    }
  },
  async categories(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const categories = await prisma.post
        .findUnique({
          where: { id },
        })
        .categories();
      return categories;
    } catch (error) {
      console.log(error);

      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Categories", "post"));
    }
  },
  async tags(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const tags = await prisma.post
        .findUnique({
          where: { id },
        })
        .tags();

      return tags;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Tags", "post"));
    }
  },
  async image(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const categories = await prisma.picture.findFirst({
        where: { postId: id },
      });

      return categories;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Image", "post"));
    }
  },
  async reactionsBy(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const reactions = await prisma.post
        .findUnique({
          where: { id },
        })
        .reactionsBy();

      return reactions;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Reactions", "post"));
    }
  },
  async comments(
    { id }: IPost,
    _: any,
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    try {
      const comments = await prisma.post
        .findUnique({
          where: { id },
        })
        .comments();

      return comments;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(NOT_EXIST_FOR_ERR_MSG("Comments", "post"));
    }
  },
};
