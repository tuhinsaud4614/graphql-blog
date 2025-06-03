import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: { user: { password: true }, post: { draft: true } },
});

export default prisma;
