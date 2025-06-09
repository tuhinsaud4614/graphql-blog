import type { PrismaClient } from "@prisma/client";

export const getBookmarksByUserId = async (
  prisma: PrismaClient,
  userId: string,
  limit?: number,
  page?: number,
) => {
  const skip = page && limit ? (page - 1) * limit : 0;
  const take = limit ?? 10;

  const [bookmarks, total] = await Promise.all([
    prisma.bookmark.findMany({
      where: { userId },
      include: {
        user: true,
        post: true,
      },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.bookmark.count({
      where: { userId },
    }),
  ]);

  return { bookmarks, total };
};

export const getBookmarksByUserIdWithCursor = async (
  prisma: PrismaClient,
  userId: string,
  limit: number,
  after?: string | null,
) => {
  const take = limit + 1;

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      user: true,
      post: true,
    },
    take,
    ...(after && {
      cursor: { id: after },
      skip: 1,
    }),
    orderBy: { createdAt: "desc" },
  });

  const hasNext = bookmarks.length > limit;
  const edges = hasNext ? bookmarks.slice(0, -1) : bookmarks;

  return {
    edges: edges.map((bookmark) => ({
      cursor: bookmark.id,
      node: bookmark,
    })),
    pageInfo: {
      hasNext,
      endCursor: hasNext ? edges[edges.length - 1].id : null,
    },
    total: await prisma.bookmark.count({
      where: { userId },
    }),
  };
};

export const getBookmarkCount = async (prisma: PrismaClient) => {
  return await prisma.bookmark.count();
};

export function isBookmarkedPost(
  prisma: PrismaClient,
  postId: string,
  userId: string,
) {
  return prisma.bookmark.findUnique({
    where: { userId_postId: { userId, postId } },
  });
}

export const createBookmark = async (
  prisma: PrismaClient,
  postId: string,
  userId: string,
) => {
  return await prisma.bookmark.upsert({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
    create: {
      userId,
      postId,
    },
    update: {},
  });
};

export const deleteBookmark = async (
  prisma: PrismaClient,
  postId: string,
  userId: string,
) => {
  return await prisma.bookmark.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
};
