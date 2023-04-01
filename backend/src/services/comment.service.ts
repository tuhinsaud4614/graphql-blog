import { Comment, Prisma, PrismaClient } from "@prisma/client";

import {
  ICursorQueryParams,
  IResponseOnCursor,
  IResponseOnOffset,
} from "@/utils/interfaces";

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

export function getCommentById(prisma: PrismaClient, parentCommentId: string) {
  return prisma.comment.findFirst({
    where: { id: parentCommentId },
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

export function countReplies(
  prisma: PrismaClient,
  parentCommentId?: string | null
) {
  if (!parentCommentId) {
    return 0;
  }
  return prisma.comment.count({ where: { parentCommentId: parentCommentId } });
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

export async function getCommentsOnOffset(
  prisma: PrismaClient,
  count: number,
  page?: number,
  limit?: number,
  condition?: Prisma.CommentFindManyArgs
) {
  if (limit && page) {
    const result = await prisma.comment.findMany({
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
    } as IResponseOnOffset<Comment>;
  }

  const result = await prisma.comment.findMany(condition);
  return { data: result, total: count } as IResponseOnOffset<Comment>;
}

export async function getCommentsOnCursor(
  prisma: PrismaClient,
  params: ICursorQueryParams,
  condition: Prisma.CommentFindManyArgs,
  total: number
): Promise<IResponseOnCursor<Comment>> {
  const { after } = params;

  const limit = Math.abs(params.limit);

  let results: Comment[] = [];

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

  results = await prisma.comment.findMany({
    ...newFindArgs,
  });

  // This for has next page
  const resultsLen = results.length;
  if (resultsLen > 0) {
    const lastComment = results[resultsLen - 1];
    const newResults = await prisma.comment.findMany({
      ...condition,
      skip: 1,
      take: 1,
      cursor: {
        id: lastComment.id,
      },
    });

    return {
      total,
      pageInfo: {
        hasNext: !!newResults.length,
        endCursor: lastComment.id,
      },
      edges: results.map((comment) => ({ cursor: comment.id, node: comment })),
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

export async function getReplyCount(prisma: PrismaClient, commentId: string) {
  return prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      _count: { select: { replies: true } },
    },
  });
}

export async function getCommentsRepliesOnCursor(
  prisma: PrismaClient,
  params: ICursorQueryParams,
  commentId: string,
  count: number
): Promise<IResponseOnCursor<Comment>> {
  const { limit, after } = params;

  let newFindArgs: Prisma.CommentFindManyArgs = {
    orderBy: { updatedAt: "desc" },
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

  const temp = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      replies: newFindArgs,
    },
  });

  if (!temp) {
    return {
      total: 0,
      pageInfo: {
        hasNext: false,
        endCursor: null,
      },
      edges: [],
    };
  }
  const results: Comment[] = temp.replies;

  // This for has next page
  const resultsLen = results.length;
  if (resultsLen > 0) {
    const lastComment = results[resultsLen - 1];
    const newResults = await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        replies: {
          orderBy: { updatedAt: "desc" },
          skip: 1,
          take: 1,
          cursor: {
            id: lastComment.id,
          },
        },
      },
    });

    return {
      total: count,
      pageInfo: {
        hasNext: !!newResults?.replies.length,
        endCursor: lastComment.id,
      },
      edges: results.map((comment) => ({ cursor: comment.id, node: comment })),
    };
  }
  // This for has next page end

  return {
    total: count,
    pageInfo: {
      hasNext: false,
      endCursor: null,
    },
    edges: [],
  };
}
