import { GraphQLError } from "graphql";

import { Prisma, PrismaClient } from "@prisma/client";

import logger from "@/logger";
import {
  createCategory,
  deleteCategory,
  getCategoriesWithOffset,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";
import {
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateFetchErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import type { OffsetParams } from "@/utils/types";
import { getGraphqlYogaError, offsetParamsSchema } from "@/validations";

export async function getCategoriesByTextOnOffsetCtrl(
  prisma: PrismaClient,
  { text, ...rest }: OffsetParams & { text: string },
) {
  try {
    await offsetParamsSchema.validate(rest, {
      abortEarly: false,
    });

    const { limit, page } = rest;

    const condition: Prisma.CategoryWhereInput = {
      title: { contains: text, mode: "insensitive" },
    };
    let args: Prisma.CategoryFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: condition,
    };

    const count = await prisma.category.count({ where: condition });
    if (count === 0) {
      return { data: [], total: count };
    }

    const result = await getCategoriesWithOffset(
      prisma,
      count,
      page,
      limit,
      args,
    );
    return result;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateFetchErrorMessage("categories"));
  }
}

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
