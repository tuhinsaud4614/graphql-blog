import { PrismaClient } from "@prisma/client";

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
