import { Prisma, PrismaClient } from "@prisma/client";

/**
 * This function retrieves all posts from a Prisma database based on an optional condition.
 * @param {PrismaClient} prisma - The PrismaClient instance used to connect to the database.
 * @param [condition] - The `condition` parameter is an optional argument that can be passed to the
 * `getAllPosts` function. It is of type `Prisma.PostFindManyArgs`, which is an object that can contain
 * various options for filtering, sorting, and paginating the results of the `findMany` query.
 * @returns The function `getAllPosts` is returning a promise that resolves to an array of `Post`
 * objects fetched from the database using the `prisma.post.findMany()` method. The `condition`
 * argument is an optional object that can be used to specify additional filtering, sorting, and
 * pagination options for the query.
 */
export function getAllPosts(
  prisma: PrismaClient,
  condition?: Prisma.PostFindManyArgs,
) {
  return prisma.post.findMany({
    ...condition,
  });
}
