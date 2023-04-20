import { GraphQLError } from "graphql";

import { PrismaClient } from "@prisma/client";

import logger from "@/logger";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";
import {
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import { getGraphqlYogaError } from "@/validations";

export async function createCategoryCtrl(prisma: PrismaClient, title: string) {
  try {
    const category = await createCategory(prisma, title);
    console.log(category);

    return category;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateCreationErrorMessage("Category"));
  }
}

export async function updateCategoryCtrl(
  prisma: PrismaClient,
  id: string,
  title: string,
) {
  try {
    const isExist = await getCategoryById(prisma, id);
    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Category"));
    }

    const category = await updateCategory(prisma, id, title);
    return category;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateUpdateErrorMessage("Category"));
  }
}

export async function deleteCategoryCtrl(prisma: PrismaClient, id: string) {
  try {
    const isExist = await getCategoryById(prisma, id);
    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Category"));
    }

    const category = await deleteCategory(prisma, id);
    return category.id;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateDeleteErrorMessage("Category"));
  }
}
