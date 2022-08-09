import { Prisma, PrismaClient } from "@prisma/client";
import { ICreatePostInput, IUpdatePostInput } from "../utils/interfaces";

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
  authorId: string
) {
  return prisma.post.findFirst({ where: { id, authorId } });
}

export function getAllPost(
  prisma: PrismaClient,
  condition?: Prisma.PostFindManyArgs
) {
  return prisma.post.findMany({
    ...condition,
  });
}

export function getTrendingPosts(prisma: PrismaClient) {
  return prisma.post.findMany({
    take: 6,
    where: { published: true },
    orderBy: {
      reactionsBy: { _count: "desc" },
    },
  });
}

export function getPostsByTag(
  prisma: PrismaClient,
  condition?: Prisma.PostFindManyArgs
) {
  return prisma.post.findMany({
    ...condition,
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
  }: Omit<ICreatePostInput, "image"> & {
    imgUrl: string;
    imgWidth?: number;
    imgHeight?: number;
  }
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
  }: Omit<IUpdatePostInput, "image"> & {
    imgUrl?: string;
    imgWidth?: number;
    imgHeight?: number;
  }
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
  reactById: string
) {
  return prisma.post.update({
    where: { id },
    data: { reactionsBy: { connect: { id: reactById } } },
  });
}

export function reactionWithdrawToPost(
  prisma: PrismaClient,
  id: string,
  withdrawById: string
) {
  return prisma.post.update({
    where: { id },
    data: { reactionsBy: { disconnect: { id: withdrawById } } },
  });
}
