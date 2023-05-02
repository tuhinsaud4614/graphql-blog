import { PrismaClient } from "@prisma/client";
import path from "path";

import logger from "@/logger";
import { UnknownError } from "@/model";
import { createPost } from "@/repositories/post";
import { formatError, imageUpload, nanoid, removeFile } from "@/utils";
import { generateCreationErrorMessage } from "@/utils/constants";
import { CreatePostInput } from "@/utils/types";
import { createPostSchema } from "@/validations/post";

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
