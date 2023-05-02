import { Post, Prisma, PrismaClient, User } from "@prisma/client";

import type {
  IResponseWithCursor,
  IResponseWithOffset,
} from "@/utils/interfaces";
import type {
  CreatePostInput,
  CursorParams,
  PostReactedByCursorParams,
  UpdatePostInput,
} from "@/utils/types";

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
 * This function retrieves posts from a database using cursor-based pagination and returns them along
 * with pagination information.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {CursorParams} params - The `params` parameter is an object that contains the `limit` and
 * `after` properties. `limit` specifies the maximum number of results to return, while `after` is an
 * optional cursor that indicates where to start fetching results from.
 * @param condition - The `condition` parameter is an object of type `Prisma.PostFindManyArgs` which
 * contains the conditions to filter and sort the posts to be retrieved from the database. It can
 * include properties such as `where`, `orderBy`, `select`, `include`, etc.
 * @param {number} total - The total parameter is the total number of posts that match the given
 * condition.
 * @returns This function returns a Promise that resolves to an object with three properties: `total`,
 * `pageInfo`, and `edges`. The `total` property is a number representing the total number of posts
 * that match the given condition. The `pageInfo` property is an object with two properties: `hasNext`
 * (a boolean indicating whether there is a next page of results) and `endCursor`
 */
export async function getPostsWithCursor(
  prisma: PrismaClient,
  params: CursorParams,
  condition: Prisma.PostFindManyArgs,
  total: number,
): Promise<IResponseWithCursor<Post>> {
  const { limit, after } = params;
  let results: Post[] = [];
  let newFindArgs = {
    ...condition,
  };
  if (after) {
    newFindArgs = {
      ...newFindArgs,
      skip: 1,
      take: limit,
      cursor: { id: after },
    };
  } else {
    newFindArgs = { ...newFindArgs, take: limit };
  }
  results = await getAllPosts(prisma, newFindArgs);

  // This for has next page
  const resultsLen = results.length;
  if (resultsLen > 0) {
    const lastPost = results[resultsLen - 1];
    const newResults = await getAllPosts(prisma, {
      ...condition,
      skip: 1,
      take: 1,
      cursor: {
        id: lastPost.id,
      },
    });

    return {
      total,
      pageInfo: {
        hasNext: !!newResults.length,
        endCursor: lastPost.id,
      },
      edges: results.map((post) => ({ cursor: post.id, node: post })),
    };
  }
  // This for has next page end

  return {
    total,
    pageInfo: {
      hasNext: false,
      endCursor: null,
    },
    edges: [],
  };
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

/**
 * This function retrieves the count of reactions for a specific post using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a post
 * in the database. It is used to locate the post in the `post` table of the database.
 * @returns a Promise that resolves to an object containing the count of reactions for a specific post.
 * The count is obtained using the PrismaClient instance and the post's unique ID. The object returned
 * has a nested `_count` property that selects the `reactionsBy` field, which represents the number of
 * reactions made by users on the post.
 */
export function getPostReactionsCount(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({
    where: { id },
    select: { _count: { select: { reactionsBy: true } } },
  });
}

/**
 * This function retrieves the count of comments for a specific post using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with a database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a post
 * in the database. It is used to query the database and retrieve the count of comments associated with
 * that post.
 * @returns a Promise that resolves to an object containing the count of comments associated with a
 * post with the given `id`. The count is obtained using the `_count` and `select` options of the
 * Prisma `findUnique` method.
 */
export function getPostCommentsCount(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({
    where: { id },
    select: { _count: { select: { comments: true } } },
  });
}

/**
 * This function retrieves a list of users who reacted to a post, with pagination support.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {PostReactedByCursorParams} params - The `params` parameter is an object that contains the
 * following properties:
 * @returns This function returns an object of type `Promise<IResponseWithCursor<User>>`. The object
 * contains information about users who have reacted to a post, including the total number of users, a
 * list of edges containing the user ID and node, and pageInfo which indicates whether there is a next
 * page and the end cursor.
 */
export async function getPostReactedByWithCursor(
  prisma: PrismaClient,
  params: PostReactedByCursorParams,
): Promise<IResponseWithCursor<User>> {
  const { limit, after, id } = params;
  let results: User[] = [];

  const condition = after
    ? {
        skip: 1,
        take: limit,
        cursor: { id: after },
      }
    : { take: limit };

  const query = await prisma.post.findUnique({
    where: { id },
    select: {
      reactionsBy: {
        ...condition,
        orderBy: {
          updatedAt: "desc",
        },
      },
      _count: { select: { reactionsBy: true } },
    },
  });

  results = query?.reactionsBy || [];

  // This for has next page
  const resultsLen = results.length;
  if (resultsLen > 0) {
    const lastUser = results[resultsLen - 1];
    const newResults = await prisma.post.findUnique({
      where: { id },
      select: {
        reactionsBy: {
          skip: 1,
          take: 1,
          cursor: {
            id: lastUser.id,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    return {
      total: query?._count.reactionsBy ?? 0,
      pageInfo: {
        hasNext: !!newResults?.reactionsBy?.length,
        endCursor: lastUser.id,
      },
      edges: results.map((user) => ({ cursor: user.id, node: user })),
    };
  }
  // This for has next page end

  return {
    total: query?._count.reactionsBy ?? 0,
    pageInfo: {
      hasNext: false,
      endCursor: null,
    },
    edges: [],
  };
}

/**
 * This function retrieves the author of a post using PrismaClient and the post's ID.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post in the database. It is used to retrieve the author of the post.
 * @returns The `getPostAuthor` function is returning the author of a post with the given `postId`. It
 * uses the Prisma client to find the post with the given `postId` and then returns the author of that
 * post. The return value is likely a Promise that resolves to the author object.
 */
export async function getPostAuthor(prisma: PrismaClient, postId: string) {
  return prisma.post
    .findUnique({
      where: { id: postId },
    })
    .author();
}

/**
 * This function retrieves the categories associated with a specific post using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post. It is used to retrieve the categories associated with the post from the database using
 * PrismaClient.
 * @returns The `getPostCategories` function is returning a promise that resolves to an array of
 * categories associated with a post identified by the `postId` parameter. The categories are obtained
 * by calling the `categories()` method on the `Post` object returned by the `findUnique()` method of
 * the `prisma` client.
 */
export async function getPostCategories(prisma: PrismaClient, postId: string) {
  return prisma.post
    .findUnique({
      where: { id: postId },
    })
    .categories();
}

/**
 * This function retrieves the tags associated with a specific post using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post. It is used to retrieve the tags associated with the post from the database using PrismaClient.
 * @returns The `getPostTags` function is returning a promise that resolves to an array of tags
 * associated with a post identified by the `postId` parameter. The function uses the Prisma client to
 * query the database for the post with the specified ID and then retrieves the associated tags using
 * the `tags()` method.
 */
export async function getPostTags(prisma: PrismaClient, postId: string) {
  return prisma.post
    .findUnique({
      where: { id: postId },
    })
    .tags();
}

/**
 * This function retrieves the image of a post from a Prisma database based on the post's
 * ID.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post. It is used as a filter to retrieve a specific post from the database.
 * @returns the image of a post with the given postId.
 */
export async function getPostImage(prisma: PrismaClient, postId: string) {
  return prisma.post.findUnique({
    where: { id: postId },
  }).image;
}

/**
 * This function retrieves the users who reacted to a specific post using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows us to
 * interact with the database.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post in a database. It is used to retrieve the post from the database and find the users who reacted
 * to it.
 * @returns a Promise that resolves to an array of users who reacted to a post with the given postId.
 * The function uses PrismaClient to query the database and retrieve the post with the given postId,
 * and then it uses the `reactionsBy()` method to retrieve the users who reacted to the post.
 */
export async function getPostReactedBy(prisma: PrismaClient, postId: string) {
  return prisma.post
    .findUnique({
      where: { id: postId },
    })
    .reactionsBy();
}

/**
 * This function retrieves comments for a specific post using Prisma client in TypeScript.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} postId - postId is a string parameter that represents the unique identifier of a
 * post. It is used to retrieve the comments associated with that post from the database using
 * PrismaClient.
 * @returns The `getPostComments` function is returning a promise that resolves to an array of comments
 * associated with a post identified by the `postId` parameter. The comments are obtained by first
 * finding the post using its unique identifier (`id`) and then accessing its associated comments using
 * the `comments()` method.
 */
export async function getPostComments(prisma: PrismaClient, postId: string) {
  return prisma.post
    .findUnique({
      where: { id: postId },
    })
    .comments();
}
