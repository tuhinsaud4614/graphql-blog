import { Prisma, PrismaClient } from "@prisma/client";

export function getManyTags(
  prisma: PrismaClient,
  condition?: Prisma.TagFindManyArgs
) {
  return prisma.tag.findMany({
    ...condition,
  });
}
