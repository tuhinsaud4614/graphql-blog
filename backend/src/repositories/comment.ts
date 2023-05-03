import { PrismaClient } from "@prisma/client";

import { UpdateCommentInput } from "@/utils/types";

/**
 * This function creates a comment in a Prisma database with the provided data.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param data - The `data` parameter is an object that contains the necessary information to create a
 * new comment. It includes the `postId` of the post that the comment is being made on, the
 * `commenterId` of the user making the comment, and the `content` of the comment itself.
 * @returns The `createComment` function is returning a Promise that resolves to a newly created
 * comment object in the database.
 */
export function createComment(
  prisma: PrismaClient,
  data: { postId: string; commenterId: string; content: string },
) {
  const { commenterId, content, postId } = data;
  return prisma.comment.create({
    data: {
      content,
      commenter: {
        connect: {
          id: commenterId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
}

/**
 * This function creates a reply to a comment using PrismaClient and connects it to the parent comment
 * and commenter.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param data - The `data` parameter is an object that contains the following properties:
 * @returns The `createReply` function is returning a Promise that resolves to a newly created comment
 * object in the database. The comment object contains the `content` of the comment, the `commenter`
 * who posted the comment, and the `parentComment` to which the comment is a reply. The `connect`
 * method is used to establish a relationship between the comment and the commenter/parentComment by
 * referencing
 */
export function createReply(
  prisma: PrismaClient,
  data: { parentId: string; commenterId: string; content: string },
) {
  const { commenterId, content, parentId } = data;
  return prisma.comment.create({
    data: {
      content,
      commenter: { connect: { id: commenterId } },
      parentComment: { connect: { id: parentId } },
    },
  });
}

/**
 * This function updates a comment's content in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {UpdateCommentInput} data - The `data` parameter is an object that contains two properties:
 * `content` and `id`. These properties are used to update a comment in the database. `content` is the
 * new content of the comment, and `id` is the unique identifier of the comment that needs to be
 * updated.
 * @returns The `updateComment` function is returning a Promise that resolves to the updated comment
 * object.
 */
export function updateComment(prisma: PrismaClient, data: UpdateCommentInput) {
  const { content, id } = data;
  return prisma.comment.update({ where: { id }, data: { content } });
}

/**
 * This function deletes a comment from a Prisma database using its ID.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows us to
 * interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * comment that needs to be deleted. It is used in the `where` clause of the `prisma.comment.delete`
 * method to specify which comment should be deleted.
 * @returns The `deleteComment` function is returning a Promise that will resolve to the result of
 * deleting a comment from the database using the Prisma client. The comment to be deleted is
 * identified by its `id`, which is passed as an argument to the function.
 */
export function deleteComment(prisma: PrismaClient, id: string) {
  return prisma.comment.delete({ where: { id } });
}

/**
 * This function retrieves a comment from a Prisma client by its ID.
 * @param {PrismaClient} prisma - PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * comment. It is used as a filter condition in the `where` clause of the `findFirst` method to
 * retrieve a single comment from the database that matches the specified `id`.
 * @returns The function `getCommentById` is returning a Promise that resolves to the first comment
 * object that matches the provided `id` parameter, using the `prisma.comment.findFirst` method. The
 * comment object will have properties such as `id`, `content`, `createdAt`, `updatedAt`, and possibly
 * others depending on the schema definition.
 */
export function getCommentById(prisma: PrismaClient, id: string) {
  return prisma.comment.findFirst({
    where: { id },
  });
}

/**
 * This function retrieves a comment from the Prisma database based on its ID and the ID of the
 * commenter who wrote it.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows you to
 * interact with your database.
 * @param {string} id - The id parameter is a string that represents the unique identifier of a
 * comment.
 * @param {string} commenterId - The `commenterId` parameter is a string that represents the unique
 * identifier of the commenter whose comment is being searched for. It is used in the `where` clause of
 * the `findFirst` method to filter the search results and return only the comment that matches the
 * specified `id` and `comment
 * @returns This function returns a Promise that resolves to a Comment object from the PrismaClient
 * instance, which has the specified `id` and `commenterId`.
 */
export function getCommentForCommenter(
  prisma: PrismaClient,
  id: string,
  commenterId: string,
) {
  return prisma.comment.findFirst({ where: { id, commenterId } });
}
