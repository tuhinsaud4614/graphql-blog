import { GraphQLError } from "graphql";

import logger from "@/logger";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { IPost } from "@/utils/interfaces";
import { YogaContext } from "@/utils/types";

export const Post = {
  async author({ id }: IPost, _: any, { prisma }: YogaContext, __: any) {
    try {
      const author = await prisma.post
        .findUnique({
          where: { id },
        })
        .author();

      return author;
    } catch (error) {
      logger.error(error);
      return new GraphQLError(
        generateEntityNotExistErrorMessage("User", "post"),
      );
    }
  },
  async categories({ id }: IPost, _: any, { prisma }: YogaContext, __: any) {
    try {
      const categories = await prisma.post
        .findUnique({
          where: { id },
        })
        .categories();
      return categories;
    } catch (error) {
      logger.error(error);

      return new GraphQLError(
        generateEntityNotExistErrorMessage("Categories", "post"),
      );
    }
  },
  async tags({ id }: IPost, _: any, { prisma }: YogaContext, __: any) {
    try {
      const tags = await prisma.post
        .findUnique({
          where: { id },
        })
        .tags();

      return tags;
    } catch (error) {
      logger.error(error);
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Tags", "post"),
      );
    }
  },
  async image({ id }: IPost, _: any, { prisma }: YogaContext, __: any) {
    try {
      const categories = await prisma.picture.findFirst({
        where: { postId: id },
      });

      return categories;
    } catch (error) {
      logger.error(error);
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Image", "post"),
      );
    }
  },
  async reactionsBy({ id }: IPost, _: any, { prisma }: YogaContext, __: any) {
    try {
      const reactions = await prisma.post
        .findUnique({
          where: { id },
        })
        .reactionsBy();

      return reactions;
    } catch (error) {
      logger.error(error);
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Reactions", "post"),
      );
    }
  },
  async comments(
    { id }: IPost,
    _: any,
    { prisma, user }: YogaContext,
    __: any,
  ) {
    try {
      if (!user) {
        return [];
      }
      const comments = await prisma.post
        .findUnique({
          where: { id },
        })
        .comments();

      return comments;
    } catch (error) {
      logger.error(error);
      return new GraphQLError(
        generateEntityNotExistErrorMessage("Comments", "post"),
      );
    }
  },
};
