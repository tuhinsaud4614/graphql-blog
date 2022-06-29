import { PrismaClient } from "@prisma/client";

export function getCategoryById(prisma: PrismaClient, id: string) {
  return prisma.category.findUnique({ where: { id } });
}
