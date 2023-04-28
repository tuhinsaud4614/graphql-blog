import { Post, Prisma, PrismaClient, User } from "@prisma/client";

import { IResponseWithCursor, IResponseWithOffset } from "@/utils/interfaces";
import { CreatePostInput, CursorParams, UpdatePostInput } from "@/utils/types";

export function getPostById(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export function getPostByIdWithReactions(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: { reactionsBy: true },
  });
}

export function getPostByIdForUser(
  prisma: PrismaClient,
  id: string,
  authorId: string,
) {
  return prisma.post.findFirst({ where: { id, authorId } });
}

export function getAllPosts(
  prisma: PrismaClient,
  condition?: Prisma.PostFindManyArgs,
) {
  return prisma.post.findMany({
    ...condition,
  });
}

export function getPostsByTag(
  prisma: PrismaClient,
  condition?: Prisma.PostFindManyArgs,
) {
  return prisma.post.findMany({
    ...condition,
  });
}

export function getPostReactionsCount(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({
    where: { id },
    select: { _count: { select: { reactionsBy: true } } },
  });
}

export function getPostCommentsCount(prisma: PrismaClient, id: string) {
  return prisma.post.findUnique({
    where: { id },
    select: { _count: { select: { comments: true } } },
  });
}

export function isReactToThePost(
  prisma: PrismaClient,
  postId: string,
  userId: string,
) {
  return prisma.post.findFirst({
    where: { id: postId, reactionsBy: { some: { id: userId } } },
  });
}

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

export function deletePost(prisma: PrismaClient, id: string) {
  return prisma.post.delete({
    where: { id },
  });
}

export function reactionToPost(
  prisma: PrismaClient,
  id: string,
  reactById: string,
) {
  return prisma.post.update({
    where: { id },
    data: { reactionsBy: { connect: { id: reactById } } },
  });
}

export function reactionWithdrawToPost(
  prisma: PrismaClient,
  id: string,
  withdrawById: string,
) {
  return prisma.post.update({
    where: { id },
    data: { reactionsBy: { disconnect: { id: withdrawById } } },
  });
}

export async function getPostsOnCursor(
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

export async function getPostReactionsByOnCursor(
  prisma: PrismaClient,
  postId: string,
  params: CursorParams,
): Promise<IResponseWithCursor<User>> {
  const { limit, after } = params;
  let results: User[] = [];

  const condition = after
    ? {
        skip: 1,
        take: limit,
        cursor: { id: after },
      }
    : { take: limit };

  const query = await prisma.post.findUnique({
    where: { id: postId },
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
      where: { id: postId },
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

export async function getPostsOnOffset(
  prisma: PrismaClient,
  count: number,
  page?: number,
  limit?: number,
  condition?: Prisma.PostFindManyArgs,
) {
  if (limit && page) {
    const result = await prisma.post.findMany({
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

  const result = await prisma.post.findMany(condition);
  return { data: result, total: count } as IResponseWithOffset<Post>;
}
