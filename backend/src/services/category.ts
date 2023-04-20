import { Prisma, PrismaClient } from "@prisma/client";

import logger from "@/logger";
import { getCategoriesWithOffset } from "@/repositories/category";
import { formatError } from "@/utils";
import { generateFetchErrorMessage } from "@/utils/constants";
import type { CategoriesByTextParams, OffsetParams } from "@/utils/types";
import { offsetParamsSchema } from "@/validations";
import { categoriesByTextSchema } from "@/validations/category";

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
    return formatError(error, { key: "categories params" });
  }

  try {
    const { limit, page } = params;
    const args: Prisma.CategoryFindManyArgs = {
      orderBy: { updatedAt: "desc" },
    };

    const count = await prisma.category.count();
    if (count === 0) {
      return { data: [], total: count };
    }

    return await getCategoriesWithOffset(prisma, count, page, limit, args);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateFetchErrorMessage("categories"),
    });
  }
}

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
    return formatError(error, { key: "categories params" });
  }

  try {
    const { limit, page, text } = params;

    const condition: Prisma.CategoryWhereInput = {
      title: { contains: text, mode: "insensitive" },
    };

    const args: Prisma.CategoryFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: condition,
    };

    const count = await prisma.category.count({ where: condition });
    if (count === 0) {
      return { data: [], total: count };
    }

    return await getCategoriesWithOffset(prisma, count, page, limit, args);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateFetchErrorMessage("categories"),
    });
  }
}
