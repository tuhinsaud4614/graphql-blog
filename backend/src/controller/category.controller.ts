import { GraphQLYogaError } from "@graphql-yoga/node";
import { Prisma, PrismaClient } from "@prisma/client";
import logger from "../logger";
import {
  createCategory,
  deleteCategory,
  getCategoriesOnOffset,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import {
  CREATION_ERR_MSG,
  DELETE_ERR_MSG,
  FETCH_ERR_MSG,
  NOT_EXIST_ERR_MSG,
  UPDATE_ERR_MSG,
} from "../utils/constants";
import { IOffsetQueryParams } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { offsetQueryParamsSchema } from "../validations/post.validation";

export async function getCategoriesOnOffsetCtrl(
  prisma: PrismaClient,
  params: IOffsetQueryParams
) {
  try {
    await offsetQueryParamsSchema.validate(params, {
      abortEarly: false,
    });

    const { limit, page } = params;
    let args: Prisma.CategoryFindManyArgs = {
      orderBy: { updatedAt: "desc" },
    };

    const count = await prisma.category.count();
    if (count === 0) {
      return { data: [], total: count };
    }

    const result = await getCategoriesOnOffset(
      prisma,
      count,
      page,
      limit,
      args
    );
    return result;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("categories"));
  }
}

export async function getCategoriesByTextOnOffsetCtrl(
  prisma: PrismaClient,
  { text, ...rest }: IOffsetQueryParams & { text: string }
) {
  try {
    await offsetQueryParamsSchema.validate(rest, {
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

    const result = await getCategoriesOnOffset(
      prisma,
      count,
      page,
      limit,
      args
    );
    return result;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("categories"));
  }
}

export async function createCategoryCtrl(prisma: PrismaClient, title: string) {
  try {
    const category = await createCategory(prisma, title);
    console.log(category);

    return category;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("Category"));
  }
}

export async function updateCategoryCtrl(
  prisma: PrismaClient,
  id: string,
  title: string
) {
  try {
    const isExist = await getCategoryById(prisma, id);
    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Category"));
    }

    const category = await updateCategory(prisma, id, title);
    return category;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, UPDATE_ERR_MSG("Category"));
  }
}

export async function deleteCategoryCtrl(prisma: PrismaClient, id: string) {
  try {
    const isExist = await getCategoryById(prisma, id);
    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Category"));
    }

    const category = await deleteCategory(prisma, id);
    return category.id;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Category"));
  }
}
