import { PrismaClient } from "@prisma/client";
import path from "path";

import logger from "@/logger";
import { NoContentError, UnknownError } from "@/model";
import {
  createPost,
  deletePost,
  getAuthorPostById,
  updatePost,
} from "@/repositories/post";
import { formatError, imageUpload, nanoid, removeFile } from "@/utils";
import {
  generateCreationErrorMessage,
  generateDeleteErrorMessage,
  generateNotExistErrorMessage,
  generateUpdateErrorMessage,
} from "@/utils/constants";
import { CreatePostInput, UpdatePostInput } from "@/utils/types";
import { createPostSchema, updatePostSchema } from "@/validations/post";

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
