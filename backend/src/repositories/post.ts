import { Post, Prisma, PrismaClient } from "@prisma/client";

import type { IResponseWithOffset } from "@/utils/interfaces";
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
 * This function adds a reaction to a post in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * post to which the reaction is being added.
 * @param {string} reactById - The `reactById` parameter is a string representing the ID of the user
 * who reacted to the post. This parameter is used to connect the user to the post through the
 * `reactionsBy` field in the `data` object of the `prisma.post.update` method.
 * @returns a Promise that resolves to the updated post object with the newly added reaction.
 */
export function addReactionToPost(
  prisma: PrismaClient,
  id: string,
  reactById: string,
) {
  return prisma.post.update({
    where: { id },
    data: { reactionsBy: { connect: { id: reactById } } },
  });
}

/**
 * This TypeScript function removes a reaction from a post in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The ID of the post from which the reaction needs to be removed.
 * @param {string} withdrawById - The `withdrawById` parameter is a string that represents the ID of
 * the user who wants to withdraw their reaction from a post. This function uses the Prisma client to
 * update the post by disconnecting the reaction made by the user with the specified ID.
 * @returns a Promise that resolves to the updated post object in the database after removing a
 * reaction from it.
 */
export function removeReactionFromPost(
  prisma: PrismaClient,
  id: string,
  withdrawById: string,
) {
  return prisma.post.update({
    where: { id },
    data: { reactionsBy: { disconnect: { id: withdrawById } } },
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
 * This function retrieves posts from a database with optional pagination and returns them along with
 * pagination information.
 * @param {PrismaClient} prisma - A PrismaClient instance used to interact with the database.
 * @param {number} count - The total number of posts that match the given condition.
 * @param {number} [page] - The page parameter is an optional parameter that specifies the current page
 * number. It is used to calculate the offset for the database query. If this parameter is not
 * provided, the function will return all posts without pagination.
 * @param {number} [limit] - The maximum number of items to return in a single page.
 * @param [condition] - An optional argument of type `Prisma.PostFindManyArgs` that can be used to
 * filter, sort, and paginate the results returned by the `getAllPosts` function. It allows you to pass
 * additional options to the Prisma client's `findMany` method, such as `where`, `
 * @returns The function `getPostsWithOffset` returns an object of type `IResponseWithOffset<Post>`.
 * The object contains a `data` property which is an array of `Post` objects, a `total` property which
 * is the total count of `Post` objects, and a `pageInfo` property which is an object containing
 * information about the pagination such as whether there is a next page, the
 */
export async function getPostsWithOffset(
  prisma: PrismaClient,
  count: number,
  page?: number,
  limit?: number,
  condition?: Prisma.PostFindManyArgs,
) {
  if (limit && page) {
    const result = await getAllPosts(prisma, {
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
    } as IResponseWithOffset<Post>;
  }

  const result = await getAllPosts(prisma, condition);
  return { data: result, total: count } as IResponseWithOffset<Post>;
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

/**
 * This function retrieves a post from a Prisma client by its ID.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a post.
 * It is used as a filter to find a specific post in the database using the `findUnique` method of the
 * Prisma client.
 * @returns The function `getPostById` is returning a Promise that resolves to a single post object
 * from the database, identified by the `id` parameter. The post object contains all the fields defined
 * in the Prisma schema for the `Post` model.
 */
export function getPostById(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({ where: { id } });
}

/**
 * This function checks if a user has reacted to a specific post using PrismaClient.
 * @param {PrismaClient} prisma - Prisma is an instance of the PrismaClient, which is a type of
 * database client used to interact with a Prisma schema.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post in a database.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used to check if the user has reacted to a specific post.
 * @returns a Promise that resolves to a Post object from the PrismaClient that has a specific id and
 * has at least one reaction by a user with a specific id.
 */
export function hasUserReactedToPost(
  prisma: PrismaClient,
  postId: string,
  userId: string,
) {
  return prisma.post.findFirst({
    where: { id: postId, reactionsBy: { some: { id: userId } } },
  });
}
