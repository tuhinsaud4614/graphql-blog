import { Prisma, PrismaClient } from "@prisma/client";
import path from "path";

import logger from "@/logger";
import { NoContentError, UnknownError } from "@/model";
import {
  addReactionToPost,
  createPost,
  deletePost,
  getAllPosts,
  getAuthorPostById,
  getPostById,
  getPostReactionsCount,
  getPostsWithCursor,
  getPostsWithOffset,
  hasUserReactedToPost,
  removeReactionFromPost,
  updatePost,
} from "@/repositories/post";
import { formatError, imageUpload, nanoid, removeFile } from "@/utils";
import {
  REACTIONS_ERR_MSG,
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateFetchErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import type { YogaPubSubType } from "@/utils/context";
import { EReactionsMutationStatus } from "@/utils/enums";
import { IReactionsCount } from "@/utils/interfaces";
import type {
  CreatePostInput,
  CursorParams,
  OffsetParams,
  PostsByTagOffsetParams,
  UpdatePostInput,
  UserWithAvatar,
} from "@/utils/types";
import { cursorParamsSchema, offsetParamsSchema } from "@/validations";
import {
  createPostSchema,
  postsByTagSchema,
  updatePostSchema,
} from "@/validations/post";

/**
 * This function creates a post with an image and validates the input parameters using TypeScript and
 * Prisma.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for Node.js that can be used to interact with a database using TypeScript or JavaScript.
 * @param {CreatePostInput} params - The `params` parameter is an object of type `CreatePostInput`,
 * which contains the data needed to create a new post. This includes the post's title, content, and an
 * optional image.
 * @param {string} authorId - The ID of the user who is creating the post.
 * @returns either an error object or the result of calling the `createPost` function with the provided
 * `prisma` client, `authorId`, and a modified version of the `params` object. The modified `params`
 * object includes an `imgUrl` property that is set to `images/`, where `name` is the name of
 * the uploaded image file, and `
 */
export async function postCreationService(
  prisma: PrismaClient,
  params: CreatePostInput,
  authorId: string,
) {
  try {
    await createPostSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "post creation" });
  }

  let imagePath;
  try {
    const { image, ...rest } = params;

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, height, width, filePath } = await imageUpload(
      image,
      dest,
      uId,
    );

    imagePath = filePath;
    return await createPost(prisma, authorId, {
      ...rest,
      imgUrl: `images/${name}`,
      imgHeight: height,
      imgWidth: width,
    });
  } catch (error) {
    removeFile(imagePath);
    logger.error(error);
    return new UnknownError(generateCreationErrorMessage("Post"));
  }
}

/**
 * This is an async function that updates a post in a database, including uploading an image if
 * provided and validating the input parameters.
 * @param {PrismaClient} prisma - An instance of the PrismaClient used to interact with the database.
 * @param {UpdatePostInput} params - The `params` parameter is an object of type `UpdatePostInput`
 * which contains the data needed to update a post. It may contain the following properties:
 * @param {string} userId - The `userId` parameter is a string representing the ID of the user who is
 * making the request to modify a post.
 * @returns either a formatted error object or the result of calling the `updatePost` function with
 * modified parameters. If an error occurs during the execution of the function, it will return a
 * `UnknownError` object with a generated error message.
 */
export async function postModificationService(
  prisma: PrismaClient,
  params: UpdatePostInput,
  userId: string,
) {
  try {
    await updatePostSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "post modification" });
  }

  let imagePath: string | undefined;
  let imageName: string | undefined;
  let imgWidth: number | undefined;
  let imgHeight: number | undefined;

  try {
    const { image, ...rest } = params;
    const isExist = await getAuthorPostById(prisma, rest.id, userId);

    if (!isExist) {
      return new NoContentError(generateNotExistErrorMessage("Post"));
    }

    if (image) {
      const uId = nanoid();
      const dest = path.join(process.cwd(), "images");
      const { name, height, width, filePath } = await imageUpload(
        image,
        dest,
        uId,
      );
      imagePath = filePath;
      imageName = `images/${name}`;
      imgHeight = height;
      imgWidth = width;
    }
    return await updatePost(prisma, {
      ...rest,
      imgUrl: imageName,
      imgHeight,
      imgWidth,
    });
  } catch (error) {
    removeFile(imagePath);
    logger.error(error);
    return new UnknownError(generateUpdateErrorMessage("Post"));
  }
}

/**
 * This function deletes a post from a database using Prisma and returns the deleted post's
 * ID or an error message.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for Node.js that provides autocompletion and type checking for database queries.
 * @param {string} id - The id parameter is a string that represents the unique identifier of a post
 * that needs to be deleted.
 * @param {string} authorId - The authorId parameter is a string that represents the ID of the author
 * who created the post that is being deleted.
 * @returns either the ID of the deleted post if the deletion is successful, or an error object (either
 * a NoContentError or an UnknownError) if there is an issue with the deletion process.
 */
export async function postDeletionService(
  prisma: PrismaClient,
  id: string,
  authorId: string,
) {
  try {
    const isExist = await getAuthorPostById(prisma, id, authorId);

    if (!isExist) {
      return new NoContentError(generateNotExistErrorMessage("Post"));
    }

    const deletedPost = await deletePost(prisma, id);
    return deletedPost.id;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateDeleteErrorMessage("Post"));
  }
}

/**
 * This function toggles a user's reaction to a post and publishes the change using a PubSub
 * system.
 * @param {PrismaClient} prisma - an instance of PrismaClient, which is a type-safe database client for
 * TypeScript and Node.js that can be used to interact with a database.
 * @param {YogaPubSubType} pubSub - pubSub is a parameter of type YogaPubSubType, which is likely a
 * custom type defined in the codebase for handling subscriptions in a GraphQL server. It is used to
 * publish updates to clients subscribed to a particular topic, in this case "reactions".
 * @param {string} toId - The ID of the post to toggle the reaction on.
 * @param {UserWithAvatar} user - The `user` parameter is an object that represents a user with their
 * avatar. It likely contains properties such as `id`, `name`, `email`, and `avatarUrl`.
 * @returns either `EReactionsMutationStatus.React` or `EReactionsMutationStatus.Withdraw` depending on
 * whether the user has already reacted to the post or not. If there is an error, it returns a new
 * `UnknownError` object with a message.
 */
export async function toggleReactionToPostService(
  prisma: PrismaClient,
  pubSub: YogaPubSubType,
  toId: string,
  user: UserWithAvatar,
) {
  try {
    const isExist = await getPostById(prisma, toId);

    if (!isExist) {
      return new NoContentError(generateNotExistErrorMessage("Post"));
    }
    const isReacted = await hasUserReactedToPost(prisma, toId, user.id);

    if (!isReacted) {
      await addReactionToPost(prisma, toId, user.id);

      pubSub.publish("reactions", toId, {
        reactBy: user,
        mutation: EReactionsMutationStatus.React,
      });
      return EReactionsMutationStatus.React;
    }

    await removeReactionFromPost(prisma, toId, user.id);
    pubSub.publish("reactions", toId, {
      reactBy: user,
      mutation: EReactionsMutationStatus.Withdraw,
    });

    return EReactionsMutationStatus.Withdraw;
  } catch (error) {
    logger.error(error);
    return new UnknownError(REACTIONS_ERR_MSG);
  }
}

/**
 * This function retrieves published posts with an offset and returns them along with the
 * total count of posts.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is used to interact with the
 * database.
 * @param {OffsetParams} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns either an error object or an object containing an array of post data and the total count of
 * posts that match the condition of being published.
 */
export async function postsWithOffsetService(
  prisma: PrismaClient,
  params: OffsetParams,
) {
  try {
    await offsetParamsSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "posts with offset" });
  }

  try {
    const { limit, page } = params;
    const condition = {
      where: { published: true },
    };
    const args: Prisma.PostFindManyArgs = {
      ...condition,
      orderBy: { updatedAt: "desc" },
    };

    const count = await prisma.post.count(condition);
    if (count === 0) {
      return { data: [], total: count };
    }

    return await getPostsWithOffset(prisma, count, page, limit, args);
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("posts"));
  }
}

/**
 * This function retrieves published posts with a cursor and validates the input parameters.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {CursorParams} params - The `params` parameter is an object containing cursor-based
 * pagination parameters such as `first`, `last`, `before`, and `after`. These parameters are used to
 * retrieve a specific subset of data from a larger dataset.
 * @returns The function `postsWithCursorService` returns a Promise that resolves to the result of
 * calling the `getPostsWithCursor` function with the provided `prisma` client, `params` object, `args`
 * object, and `count` number. If there are any validation errors, it returns a formatted error object.
 * If there are any other errors, it returns a new `UnknownError` object
 */
export async function postsWithCursorService(
  prisma: PrismaClient,
  params: CursorParams,
) {
  try {
    await cursorParamsSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "posts with cursor" });
  }

  try {
    const args: Prisma.PostFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: { published: true },
    };
    const count = await prisma.post.count({ where: { published: true } });

    return await getPostsWithCursor(prisma, params, args, count);
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("posts"));
  }
}

/**
 * This function retrieves posts from authors that a user is following using cursor
 * pagination.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for Node.js and TypeScript. It allows you to interact with your database using a type-safe API.
 * @param {CursorParams} params - The `params` parameter is an object containing cursor-based
 * pagination parameters such as `first`, `last`, `before`, and `after`. These parameters are used to
 * limit the number of results returned and to navigate through pages of results.
 * @param {string} userId - The `userId` parameter is a string representing the ID of the user whose
 * followed authors' posts are being fetched.
 * @returns a Promise that resolves to the result of calling the `getPostsWithCursor` function with the
 * provided parameters, which is an array of Post objects with pagination information. If there is an
 * error during the execution of the function, it returns an error object.
 */
export async function followingAuthorPostsService(
  prisma: PrismaClient,
  params: CursorParams,
  userId: string,
) {
  try {
    await cursorParamsSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "following author posts" });
  }

  try {
    const condition = {
      where: {
        published: true,
        author: { followers: { some: { id: userId } } },
      } as Prisma.PostWhereInput,
    };

    const args: Prisma.PostFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.post.count(condition);

    return await getPostsWithCursor(prisma, params, args, count);
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("posts"));
  }
}

/**
 * This function retrieves a post by its ID using Prisma and returns it, or logs an error
 * and returns an UnknownError if the post does not exist.
 * @param {PrismaClient} prisma - PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a post.
 * This function uses this identifier to retrieve a specific post from the database using the
 * `getPostById` function.
 * @returns The `postByIdService` function is returning the result of the `getPostById` function if it
 * is successful, and if there is an error, it is logging the error and returning a new `UnknownError`
 * object with a message generated by the `generateNotExistErrorMessage` function for the "Post"
 * entity.
 */
export async function postByIdService(prisma: PrismaClient, id: string) {
  try {
    const result = await getPostById(prisma, id);
    return result;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateNotExistErrorMessage("Post"));
  }
}

/**
 * This function retrieves the top 6 trending posts from a Prisma database based on their
 * reactions and comments count.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @returns The `trendingPostsService` function is returning the result of calling the `getAllPosts`
 * function with a set of parameters. The `getAllPosts` function is expected to return a list of posts
 * that match the specified criteria, such as being published and having the highest number of
 * reactions and comments. If an error occurs, the function will log the error and return an instance
 * of the `UnknownError
 */
export async function trendingPostsService(prisma: PrismaClient) {
  try {
    return await getAllPosts(prisma, {
      take: 6,
      where: { published: true },
      orderBy: [
        {
          reactionsBy: { _count: "desc" },
        },
        {
          comments: { _count: "desc" },
        },
      ],
    });
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("posts"));
  }
}

/**
 * This is a function that retrieves posts with a specific tag and offset pagination from a
 * Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {PostsByTagOffsetParams} params - The `params` parameter is an object that contains the
 * following properties:
 * @returns either an error object or an object containing an array of post data and the total count of
 * posts that match the given tag. The post data is retrieved using the Prisma client and the function
 * `getPostsWithOffset`, which takes in the Prisma client, the total count of posts, the page number,
 * the limit of posts per page, and the query arguments.
 */
export async function postsByTagWithOffsetService(
  prisma: PrismaClient,
  params: PostsByTagOffsetParams,
) {
  try {
    await postsByTagSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "posts by tag" });
  }

  try {
    const { limit, page, tag } = params;
    const condition = {
      where: {
        published: true,
        tags: { some: { title: tag } },
      },
    };

    const count = await prisma.post.count(condition);
    if (count === 0) {
      return { data: [], total: count };
    }

    const args: Prisma.PostFindManyArgs = {
      ...condition,
      orderBy: {
        updatedAt: "desc",
      },
    };
    return await getPostsWithOffset(prisma, count, page, limit, args);
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("posts"));
  }
}

/**
 * This function retrieves the count of reactions and whether a user has reacted to a post using
 * PrismaClient.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} userId - The `userId` parameter is a string representing the unique identifier of
 * the user whose reaction to the post is being checked.
 * @param {string} postId - The ID of the post for which the reactions count is being retrieved.
 * @returns an object of type `IReactionsCount` which has two properties: `count` and `reacted`. The
 * `count` property is the total number of reactions on a post, and the `reacted` property is a boolean
 * value indicating whether the user with the given `userId` has reacted to the post with the given
 * `postId`. If there is an error,
 */
export async function postReactionsCountService(
  prisma: PrismaClient,
  userId: string,
  postId: string,
) {
  try {
    const [count, isReacted] = await prisma.$transaction([
      getPostReactionsCount(prisma, postId),
      hasUserReactedToPost(prisma, postId, userId),
    ]);
    return {
      count: count?._count.reactionsBy ?? 0,
      reacted: !!isReacted,
    } as IReactionsCount;
  } catch (error) {
    logger.error(error);
    return new UnknownError("Post reactions counting failed.");
  }
}
