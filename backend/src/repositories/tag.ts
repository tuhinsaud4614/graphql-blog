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

/**
 * This function retrieves all posts associated with a specific tag ID using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows us to
 * interact with the database using Prisma's query builder.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a tag
 * in the database. It is used to find the tag in the `prisma.tag` table and retrieve all the posts
 * associated with that tag.
 * @returns a Promise that resolves to an array of posts associated with a specific tag, identified by
 * its `id`. The function uses the Prisma client to query the database and retrieve the tag with the
 * specified `id`, and then returns the `posts` field of that tag, which is a relation to the posts
 * that have that tag.
 */
export function getTagPosts(prisma: PrismaClient, id: string) {
  return prisma.tag
    .findUnique({
      where: { id },
    })
    .posts();
}

/**
 * The function `getTagById` retrieves a tag from the database using its unique identifier.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class. It
 * is used to interact with the database and perform CRUD operations.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a tag.
 * @returns the result of the `prisma.tag.findUnique` method, which is a single tag object that matches
 * the provided `id`.
 */
export function getTagById(prisma: PrismaClient, id: string) {
  return prisma.tag.findUnique({ where: { id } });
}

/**
 * The function creates a new tag with the given title using the Prisma client.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class,
 * which is used to interact with the database. It provides methods for performing CRUD operations on
 * the database tables.
 * @param {string} title - The `title` parameter is a string that represents the title of the tag that
 * you want to create.
 * @returns a promise that resolves to the created tag object.
 */
export async function createTag(prisma: PrismaClient, title: string) {
  return prisma.tag.create({
    data: {
      title,
    },
  });
}

/**
 * The function updates the title of a tag in a Prisma database.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class,
 * which is used to interact with the database. It provides methods for querying, creating, updating,
 * and deleting data.
 * @param {string} id - The `id` parameter is the unique identifier of the tag that you want to update.
 * @param {string} title - The `title` parameter is a string that represents the new title of the tag
 * that you want to update.
 * @returns the result of the `prisma.tag.update` method.
 */
export function updateTag(prisma: PrismaClient, id: string, title: string) {
  return prisma.tag.update({
    where: { id },
    data: { title },
  });
}

/**
 * The function deletes a tag from the Prisma database based on its ID.
 * @param {PrismaClient} prisma - The `prisma` parameter is an instance of the PrismaClient class,
 * which is used to interact with the database. It provides methods for performing CRUD operations on
 * the database tables.
 * @param {string} id - The `id` parameter is the unique identifier of the tag that you want to delete.
 * @returns The deleteTag function is returning the result of the prisma.tag.delete operation.
 */
export function deleteTag(prisma: PrismaClient, id: string) {
  return prisma.tag.delete({
    where: { id },
  });
}
