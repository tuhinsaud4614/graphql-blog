import { PrismaClient } from "@prisma/client";

import { isDev } from "./type-guard";

const prisma = new PrismaClient({
  omit: { user: { password: true }, post: { draft: true } },
  log: isDev() ? ["query"] : undefined,
});

export default prisma;
