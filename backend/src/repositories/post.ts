import { Prisma, PrismaClient } from "@prisma/client";

import type { CreatePostInput, UpdatePostInput } from "@/utils/types";

/**
 * This function creates a post with various properties and connects it to categories and tags using
 * PrismaClient.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} authorId - The ID of the author who is creating the post.
 * @param  - The `createPost` function takes in the following parameters:
 * @returns The `createPost` function is returning a Promise that resolves to a newly created post
 * object in the database.
 */
export function createPost(
  prisma: PrismaClient,
  authorId: string,
  {
    categories,
    content,
    published,
    tags,
    title,
    imgHeight,
    imgUrl,
    imgWidth,
  }: Omit<CreatePostInput, "image"> & {
    imgUrl: string;
    imgWidth?: number;
    imgHeight?: number;
  },
) {
  return prisma.post.create({
    data: {
      title,
      content,
      authorId,
      published,
      categories: {
        connect: categories.map((category) => ({ id: category })),
      },
      image: {
        create: {
          url: imgUrl,
          width: imgWidth || 200,
          height: imgHeight || 200,
        },
      },
      publishedAt: published ? new Date() : undefined,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          create: { title: tag },
          where: { title: tag },
        })),
      },
    },
  });
}

/**
 * This function updates a post in a Prisma database with new data including categories, content,
 * published status, tags, and image information.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param  - The `updatePost` function takes in a `prisma` instance of `PrismaClient` and an object
 * containing the following properties:
 * @returns The `updatePost` function is returning a Promise that resolves to the updated post object
 * in the database.
 */
export function updatePost(
  prisma: PrismaClient,
  {
    id,
    categories,
    content,
    published,
    tags,
    title,
    imgHeight,
    imgUrl,
    imgWidth,
  }: Omit<UpdatePostInput, "image"> & {
    imgUrl?: string;
    imgWidth?: number;
    imgHeight?: number;
  },
) {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
      publishedAt: published ? new Date() : undefined,
      categories: {
        ...(categories ? { set: [] } : {}),
        connect: categories?.map((category) => ({ id: category })),
      },
      image: {
        update: {
          url: imgUrl,
          width: imgWidth,
          height: imgHeight,
        },
      },
      tags: {
        ...(tags ? { set: [] } : {}),
        connectOrCreate: tags?.map((tag) => ({
          create: { title: tag },
          where: { title: tag },
        })),
      },
    },
  });
}

/**
 * This function deletes a post from a Prisma database based on its ID.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * post that needs to be deleted. It is used in the `where` clause of the `prisma.post.delete` method
 * to specify which post should be deleted.
 * @returns The `deletePost` function is returning a Promise that resolves to the result of deleting a
 * post from the database using the Prisma client. The `where` clause specifies the post to be deleted
 * based on its `id`.
 */
export function deletePost(prisma: PrismaClient, id: string) {
  return prisma.post.delete({
    where: { id },
  });
}

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

/**
 * This function retrieves a post by its ID and author ID using Prisma.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} id - The id parameter is a string that represents the unique identifier of a post.
 * @param {string} authorId - The `authorId` parameter is a string that represents the unique
 * identifier of the author of a post. It is used in conjunction with the `id` parameter to retrieve a
 * specific post from the database using the Prisma client.
 * @returns The function `getAuthorPostById` is returning a Promise that resolves to a single post
 * object from the PrismaClient instance, where the post has the specified `id` and `authorId`.
 */
export function getAuthorPostById(
  prisma: PrismaClient,
  id: string,
  authorId: string,
) {
  return prisma.post.findFirst({ where: { id, authorId } });
}
