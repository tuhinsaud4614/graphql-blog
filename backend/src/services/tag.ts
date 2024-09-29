import { GraphQLError } from "graphql";

import { Prisma, PrismaClient } from "@prisma/client";

import logger from "@/logger";
import { UnknownError } from "@/model";
import {
  createTag,
  deleteTag,
  getManyTags,
  getTagById,
  updateTag,
} from "@/repositories/tag";
import { formatError } from "@/utils";
import {
  NOT_EXIST,
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateFetchErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import { IOffsetPageInfo } from "@/utils/interfaces";
import type {
  IDParams,
  OffsetParams,
  TagCreationParams,
  TagModificationParams,
  TagsByTextWithOffsetParams,
} from "@/utils/types";
import { idParamsSchema, offsetParamsSchema } from "@/validations";
import {
  tagCreationSchema,
  tagModificationSchema,
} from "@/validations/category";
import { tagsByTextWithOffsetSchema } from "@/validations/tag";

/**
 * This function retrieves a list of tags with pagination and returns the results along with
 * total count and page information.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {OffsetParams} params - The `params` parameter is an object that contains the pagination
 * parameters `limit` and `page`. These parameters are used to limit the number of results returned and
 * to specify which page of results to return. The `params` object is validated using a schema before
 * being used in the function.
 * @returns The function `tagsWithOffsetService` returns an object with the properties `results`,
 * `total`, and optionally `pageInfo`. The `results` property contains an array of tags retrieved from
 * the database, while the `total` property contains the total number of tags in the database. If the
 * `limit` and `page` parameters are provided, the function also returns a `pageInfo` object
 */
export async function tagsWithOffsetService(
  prisma: PrismaClient,
  params: OffsetParams,
) {
  try {
    await offsetParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "tags" });
  }

  try {
    const { limit, page } = params;

    let args: Prisma.TagFindManyArgs = {
      orderBy: { updatedAt: "desc" },
    };

    // limit && page all have value return paginate value
    const count = await prisma.tag.count();
    if (limit && page) {
      args = {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      };
      const result = await getManyTags(prisma, args);

      return {
        results: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        } as IOffsetPageInfo,
      };
    }

    const results = await getManyTags(prisma, args);

    return { results, total: count };
  } catch (error: unknown) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("tags"));
  }
}

/**
 * This function searches for tags in a Prisma database based on a given text input and
 * returns the results with optional pagination.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {TagsByTextWithOffsetParams} params - The `params` parameter is an object that contains the
 * following properties:
 * @returns an object with the results of a search for tags in a database based on a given text, along
 * with pagination information if limit and page parameters are provided. If there is an error, it
 * returns an error object.
 */
export async function tagsByTextWithOffsetService(
  prisma: PrismaClient,
  params: TagsByTextWithOffsetParams,
) {
  try {
    await tagsByTextWithOffsetSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "tags bt text" });
  }

  try {
    const { limit, page, text } = params;
    const condition: Prisma.TagWhereInput = {
      title: { contains: text, mode: "insensitive" },
    };
    let args: Prisma.TagFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: condition,
    };

    // limit && page all have value return paginate value

    const count = await prisma.tag.count({ where: condition });
    if (limit && page) {
      args = {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      };
      const result = await getManyTags(prisma, args);

      return {
        results: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        } as IOffsetPageInfo,
      };
    }

    const results = await getManyTags(prisma, args);

    return { results, total: count };
  } catch (error: unknown) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("tags by text"));
  }
}

/**
 * The function `tagCountService` retrieves the count of tags from a Prisma client and returns it.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class. It
 * is used to interact with the database and perform CRUD operations. In this code snippet, it is used
 * to count the number of records in the `tag` table.
 * @returns the count of tags in the database.
 */
export async function tagCountService(prisma: PrismaClient) {
  try {
    const count = await prisma.tag.count();

    return count;
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateFetchErrorMessage("tag count"),
    });
  }
}

/**
 * The `tagCreationService` function in TypeScript is responsible for creating a new tag using the
 * Prisma ORM and validating the input parameters.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class,
 * which is used to interact with the database. It provides methods for querying, creating, updating,
 * and deleting data.
 * @param {TagCreationParams} params - The `params` parameter is an object that contains the necessary
 * data for creating a tag. It likely includes properties such as `title`, which represents the title
 * of the tag.
 * @returns the result of the `createTag` function, which is a promise.
 */
export async function tagCreationService(
  prisma: PrismaClient,
  params: TagCreationParams,
) {
  try {
    await tagCreationSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "Tag creation" });
  }

  try {
    return await createTag(prisma, params.title);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateCreationErrorMessage("Tag"),
    });
  }
}

/**
 * The tagModificationService function in TypeScript is used to validate and update a tag in a database
 * using Prisma.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient, which is a
 * database client generated by Prisma. It allows you to interact with your database using Prisma's
 * query API.
 * @param {TagModificationParams} params - The `params` parameter is an object that contains the
 * following properties:
 * @returns the result of the `updateTag` function, which is called with the `prisma`, `id`, and
 * `title` parameters.
 */
export async function tagModificationService(
  prisma: PrismaClient,
  params: TagModificationParams,
) {
  try {
    await tagModificationSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "Tag modification" });
  }

  try {
    const { id, title } = params;
    const isExist = await getTagById(prisma, id);
    if (!isExist) {
      return new GraphQLError(generateNotExistErrorMessage("Tag"), {
        extensions: { code: NOT_EXIST },
      });
    }

    return await updateTag(prisma, id, title);
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateUpdateErrorMessage("Tag"),
    });
  }
}

/**
 * The tagDeletionService function deletes a tag from the database using Prisma and returns the ID of
 * the deleted tag.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient, which is a
 * database client generated by Prisma. It allows you to interact with your database using Prisma's
 * query API.
 * @param {IDParams} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns the ID of the deleted tag if the deletion is successful. If there is an error during the
 * deletion process, it will return a formatted error message.
 */
export async function tagDeletionService(
  prisma: PrismaClient,
  params: IDParams,
) {
  try {
    await idParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "Tag deletion" });
  }

  try {
    const { id } = params;
    const isExist = await getTagById(prisma, id);

    if (!isExist) {
      logger.error(generateNotExistErrorMessage("Tag"));
      return new GraphQLError(generateNotExistErrorMessage("Tag"), {
        extensions: { code: NOT_EXIST },
      });
    }

    const category = await deleteTag(prisma, id);
    return category.id;
  } catch (error) {
    logger.error(error);
    return formatError(error, {
      message: generateDeleteErrorMessage("Tag"),
    });
  }
}
