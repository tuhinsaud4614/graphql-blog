import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import {
  CREATION_ERR_MSG,
  DELETE_ERR_MSG,
  NOT_EXIST_ERR_MSG,
  UPDATE_ERR_MSG,
} from "../utils/constants";
import { getGraphqlYogaError } from "../validations";

export async function createCategoryCtrl(prisma: PrismaClient, title: string) {
  try {
    const category = await createCategory(prisma, title);
    console.log(category);

    return category;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Category"));
  }
}
