import { PrismaClient } from "@prisma/client";

export function getCategoryById(prisma: PrismaClient, id: string) {
  return prisma.category.findUnique({ where: { id } });
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
