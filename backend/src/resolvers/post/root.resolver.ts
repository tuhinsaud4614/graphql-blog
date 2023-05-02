import { Post as IPost } from "@prisma/client";

import logger from "@/logger";
import { UnknownError } from "@/model";
import {
  getPostAuthor,
  getPostCategories,
  getPostComments,
  getPostImage,
  getPostReactedBy,
  getPostTags,
} from "@/repositories/post";
import { generateEntityNotExistErrorMessage } from "@/utils/constants";
import type { YogaContext } from "@/utils/types";

export const Post = {
  async author(
    { id }: IPost,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getPostAuthor(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("User", "post"),
      );
    }
  },
  async categories(
    { id }: IPost,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getPostCategories(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("Categories", "post"),
      );
    }
  },
  async tags({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
    try {
      return await getPostTags(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("Tags", "post"),
      );
    }
  },
  async image({ id }: IPost, _: unknown, { prisma }: YogaContext, __: unknown) {
    try {
      return await getPostImage(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("Image", "post"),
      );
    }
  },
  async reactionsBy(
    { id }: IPost,
    _: unknown,
    { prisma }: YogaContext,
    __: unknown,
  ) {
    try {
      return await getPostReactedBy(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
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
      return await getPostComments(prisma, id);
    } catch (error) {
      logger.error(error);
      return new UnknownError(
        generateEntityNotExistErrorMessage("Comments", "post"),
      );
    }
  },
};
