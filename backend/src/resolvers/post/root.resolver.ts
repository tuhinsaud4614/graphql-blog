import { GraphQLError } from "graphql";

import logger from "@/logger";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import { YogaContext } from "@/utils/types";
import { Post as IPost } from "@prisma/client";

export const Post = {
  async author({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
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
  async categories({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
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
  async tags({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
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
  async image({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
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
  async reactionsBy({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
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
    _: unknown,
    { prisma, user }: YogaContext,
    __: unknown,
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
