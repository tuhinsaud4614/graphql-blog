import { Category, Prisma, PrismaClient } from "@prisma/client";
import { IResponseOnOffset } from "../utils/interfaces";

export function getCategoryById(prisma: PrismaClient, id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function getCategoriesOnOffset(
  prisma: PrismaClient,
  count: number,
  page?: number,
  limit?: number,
  condition?: Prisma.CategoryFindManyArgs
) {
  if (limit && page) {
    const result = await prisma.category.findMany({
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
    } as IResponseOnOffset<Category>;
  }

  const result = await prisma.category.findMany(condition);
  return { data: result, total: count } as IResponseOnOffset<Category>;
}

export function createCategory(prisma: PrismaClient, title: string) {
  return prisma.category.create({
    data: {
      title,
    },
  });
}

export function updateCategory(
  prisma: PrismaClient,
  id: string,
  title: string
) {
  return prisma.category.update({
    where: { id },
    data: { title },
  });
}
export function deleteCategory(prisma: PrismaClient, id: string) {
  return prisma.category.delete({
    where: { id },
  });
}
