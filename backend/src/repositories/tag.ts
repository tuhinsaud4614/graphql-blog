import { Prisma, PrismaClient } from "@prisma/client";

/**
 * This function retrieves multiple tags from a Prisma database based on an optional
 * condition.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param [condition] - The `condition` parameter is an optional argument of type
 * `Prisma.TagFindManyArgs`. It is used to specify additional filtering, sorting, and pagination
 * options for the `findMany` method of the `tag` model in Prisma. If no `condition` is provided, all
 * tags will
 * @returns The `getManyTags` function is returning a promise that resolves to an array of `Tag`
 * objects fetched from the database using the `prisma` client. The function takes in an optional
 * `condition` argument that can be used to filter, sort, or paginate the results.
 */
export function getManyTags(
  prisma: PrismaClient,
  condition?: Prisma.TagFindManyArgs,
) {
  return prisma.tag.findMany({
    ...condition,
  });
}
