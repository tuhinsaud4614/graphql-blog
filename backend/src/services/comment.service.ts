import { Prisma, PrismaClient } from "@prisma/client";

export function getCommentForUser(
  prisma: PrismaClient,
  id: string,
  userId: string
) {
  return prisma.comment.findFirst({ where: { id, commenterId: userId } });
}

export function getCommentForReply(
  prisma: PrismaClient,
  parentCommentId: string,
  postId: string
) {
  return prisma.comment.findFirst({
    where: { id: parentCommentId, postId: postId },
  });
}

export function getPaginateComments(
  prisma: PrismaClient,
  page: number,
  limit: number,
  condition?: Prisma.CommentFindManyArgs
) {
  return prisma.comment.findMany({
    skip: (page - 1) * limit,
    take: limit,
    ...condition,
  });
}

export function countCommentsForPost(prisma: PrismaClient, postId: string) {
  return prisma.comment.count({ where: { postId } });
}

export function createComment(
  prisma: PrismaClient,
  postId: string,
  commenterId: string,
  content: string
) {
  return prisma.comment.create({
    data: {
      content: content,
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

export function createReply(
  prisma: PrismaClient,
  parentCommentId: string,
  commenterId: string,
  content: string
) {
  return prisma.comment.create({
    data: {
      content,
      commenter: { connect: { id: commenterId } },
      parentComment: { connect: { id: parentCommentId } },
    },
  });
}

export function updateComment(
  prisma: PrismaClient,
  id: string,
  content: string
) {
  return prisma.comment.update({ where: { id }, data: { content } });
}

export function deleteComment(prisma: PrismaClient, id: string) {
  return prisma.comment.delete({ where: { id } });
}
