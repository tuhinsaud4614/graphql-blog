import { GraphQLError } from "graphql";

import { Prisma, PrismaClient } from "@prisma/client";

import logger from "@/logger";
import {
  createCategory,
  deleteCategory,
  getCategoriesWithOffset,
  getCategoryById,
  updateCategory,
} from "@/repositories/category";
import { formatError } from "@/utils";
import {
  NOT_EXIST,
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateFetchErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import type {
  CategoriesByTextParams,
  CategoryCreationParams,
  CategoryModificationParams,
  IDParams,
  OffsetParams,
} from "@/utils/types";
import { idParamsSchema, offsetParamsSchema } from "@/validations";
import {
  categoriesByTextSchema,
  categoryCreationSchema,
  categoryModificationSchema,
} from "@/validations/category";

/**
 * This function retrieves categories with pagination and validation using TypeScript and Prisma.
 * @param {OffsetParams} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns The function `categoriesWithOffset` returns an object that contains an array of category
 * data and the total count of categories. If there is an error, it returns an error message
 * formatted using the `formatError` function.
 */
export async function categoriesWithOffsetService(
  prisma: PrismaClient,
  params: OffsetParams,
) {
  try {
    await offsetParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "categories" });
  }

  try {
    const count = await prisma.category.count();
    if (count === 0) {
      return { data: [], total: count };
    }

    const { limit, page } = params;
    const args: Prisma.CategoryFindManyArgs = {
      orderBy: { updatedAt: "desc" },
    };

    return await getCategoriesWithOffset(prisma, count, page, limit, args);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateFetchErrorMessage("categories"),
    });
  }
}

/**
 * This function searches for categories in a database based on a text query and returns a paginated
 * result.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is used to interact with the
 * database.
 * @param {CategoriesByTextParams} params - The `params` parameter is an object that contains the
 * following properties:
 * @returns an object that contains an array of category data and the total count of categories that
 * match the search text. If there is an error, it returns a formatted error object.
 */
export async function categoriesByTextWithOffsetService(
  prisma: PrismaClient,
  params: CategoriesByTextParams,
) {
  try {
    await categoriesByTextSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "categories by text" });
  }

  try {
    const { limit, page, text } = params;

    const condition: Prisma.CategoryWhereInput = {
      title: { contains: text, mode: "insensitive" },
    };

    const count = await prisma.category.count({ where: condition });
    if (count === 0) {
      return { data: [], total: count };
    }

    const args: Prisma.CategoryFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: condition,
    };

    return await getCategoriesWithOffset(prisma, count, page, limit, args);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateFetchErrorMessage("categories by text"),
    });
  }
}

/**
 * The function `categoryCountService` retrieves the count of categories from a Prisma client and
 * returns it.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class,
 * which is used to interact with the database. It provides methods for querying, creating, updating,
 * and deleting data in the database. In this case, the `categoryCountService` function uses the
 * `prisma` instance
 * @returns the count of categories in the database.
 */
export async function categoryCountService(prisma: PrismaClient) {
  try {
    const count = await prisma.category.count();

    return count;
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateFetchErrorMessage("category count"),
    });
  }
}

/**
 * This is an async function that creates a new category using parameters passed in and validates them
 * using a schema.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {CategoryCreationParams} params - The `params` parameter is an object that contains the
 * necessary information to create a new category. It likely includes a `title` property that
 * represents the name of the category.
 * @returns The `categoryCreationService` function returns either a `category` object if the category
 * creation is successful or an error object if there is an error during the validation or creation
 * process. The error object is formatted using the `formatError` function and includes information
 * about the error, such as the error message and the key or message associated with the error.
 */
export async function categoryCreationService(
  prisma: PrismaClient,
  params: CategoryCreationParams,
) {
  try {
    await categoryCreationSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "Category creation" });
  }

  try {
    return await createCategory(prisma, params.title);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateCreationErrorMessage("Category"),
    });
  }
}

/**
 * This is an async function that validates and updates a category in a Prisma database based on the
 * provided parameters.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {CategoryModificationParams} params - The `params` parameter is an object that contains the
 * following properties:
 * @returns either a formatted error message or the updated category object.
 */
export async function categoryModificationService(
  prisma: PrismaClient,
  params: CategoryModificationParams,
) {
  try {
    await categoryModificationSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "Category modification" });
  }

  try {
    const { id, title } = params;
    const isExist = await getCategoryById(prisma, id);
    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Category"), {
        extensions: { code: NOT_EXIST },
      });
    }

    return await updateCategory(prisma, id, title);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateUpdateErrorMessage("Category"),
    });
  }
}

/**
 * This function deletes a category from a database using Prisma and returns the deleted category's ID.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {IDParams} params - The `params` parameter is an object that contains an `id` property, which is
 * used to identify the category that needs to be deleted.
 * @returns either the ID of the deleted category or an error message if there was an error during the
 * deletion process.
 */
export async function categoryDeletionService(
  prisma: PrismaClient,
  params: IDParams,
) {
  try {
    await idParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "Category deletion" });
  }

  try {
    const { id } = params;
    const isExist = await getCategoryById(prisma, id);

    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Category"), {
        extensions: { code: NOT_EXIST },
      });
    }

    const category = await deleteCategory(prisma, id);
    return category.id;
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateDeleteErrorMessage("Category"),
    });
  }
}
