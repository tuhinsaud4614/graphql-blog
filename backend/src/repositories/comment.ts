import { PrismaClient } from "@prisma/client";

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
