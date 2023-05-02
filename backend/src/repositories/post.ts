import { Prisma, PrismaClient } from "@prisma/client";

import type { CreatePostInput } from "@/utils/types";

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
