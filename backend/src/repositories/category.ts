import { type Category, Prisma, PrismaClient } from "@prisma/client";

import { IResponseOnOffset } from "@/utils/interfaces";

/**
 * This function retrieves a category from a Prisma client by its ID.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows us to
 * interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * category. It is used to query the database and retrieve the category with the matching `id`.
 * @returns The function `getCategoryById` is returning a Promise that resolves to the result of
 * calling the Prisma Client's `category.findUnique` method with the provided `id` as the unique
 * identifier for the category being searched for.
 */
export function getCategoryById(prisma: PrismaClient, id: string) {
  return prisma.category.findUnique({ where: { id } });
}

/**
 * This function retrieves all posts belonging to a specific category ID using Prisma.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * category. It is used to find the category in the database and retrieve all the posts associated with
 * it.
 * @returns a Promise that resolves to an array of posts that belong to a category with the specified
 * id. The function uses the Prisma client to query the database for the category with the specified
 * id, and then returns the posts associated with that category.
 */
export function getPostsByCategoryId(prisma: PrismaClient, id: string) {
  return prisma.category
    .findFirst({
      where: { id },
    })
    .posts();
}

/**
 * This TypeScript function retrieves categories from a database with optional pagination and
 * filtering.
 * @param {PrismaClient} prisma - A PrismaClient instance used to interact with the database.
 * @param {number} count - The total number of categories that match the given condition.
 * @param {number} [page] - The page parameter is an optional parameter that specifies the page number
 * of the results to retrieve. If this parameter is provided along with the limit parameter, the
 * function will return a subset of the total results based on the specified page and limit. If this
 * parameter is not provided, the function will return all results
 * @param {number} [limit] - The maximum number of categories to be returned in a single page.
 * @param [condition] - An optional argument of type `Prisma.CategoryFindManyArgs` that allows for
 * filtering, sorting, and pagination options to be passed to the `findMany` method of the Prisma
 * client.
 * @returns an object of type `IResponseOnOffset<Category>`. The object contains a `data` property
 * which is an array of `Category` objects, a `total` property which is the total count of categories,
 * and a `pageInfo` property which is an object containing information about the pagination such as
 * whether there is a next page, the next page number, the previous page number
 */
export async function getCategoriesWithOffset(
  prisma: PrismaClient,
  count: number,
  page?: number,
  limit?: number,
  condition?: Prisma.CategoryFindManyArgs,
) {
  if (limit && page) {
    const result = await prisma.category.findMany({
      skip: (page - 1) * limit,
      take: limit,
      ...condition,
    });

    return {
      data: result,
      total: count,
      pageInfo: {
        hasNext: limit * page < count,
        nextPage: page + 1,
        previousPage: page - 1,
        totalPages: Math.ceil(count / limit),
      },
    } as IResponseOnOffset<Category>;
  }

  const result = await prisma.category.findMany(condition);
  return { data: result, total: count } as IResponseOnOffset<Category>;
}

/**
 * This TypeScript function creates a new category in a Prisma database with a given title.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} title - The `title` parameter is a string that represents the title of the category
 * that we want to create. This function uses the Prisma client to create a new category in the
 * database with the given title.
 * @returns The `createCategory` function is returning a Promise that resolves to the newly created
 * category object in the database.
 */
export async function createCategory(prisma: PrismaClient, title: string) {
  return prisma.category.create({
    data: {
      title,
    },
  });
}

/**
 * This TypeScript function updates a category's title in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * category that needs to be updated. It is used in the `where` clause of the
 * `prisma.category.update` method to identify the category to be updated.
 * @param {string} title - The `title` parameter is a string that represents the new title of the
 * category that needs to be updated.
 * @returns The `updateCategory` function is returning a Promise that resolves to the updated
 * category object with the new `title` value.
 */
export function updateCategory(
  prisma: PrismaClient,
  id: string,
  title: string,
) {
  return prisma.category.update({
    where: { id },
    data: { title },
  });
}

/**
 * This function deletes a category from a Prisma client based on its ID.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * category that needs to be deleted from the database. This function uses the Prisma client to delete
 * the category with the specified `id` from the database.
 * @returns The `deleteCategory` function is returning a Promise that will resolve to the result of
 * deleting a category from the database using the Prisma client. The `where` clause specifies which
 * category to delete based on the `id` parameter passed to the function.
 */
export function deleteCategory(prisma: PrismaClient, id: string) {
  return prisma.category.delete({
    where: { id },
  });
}
