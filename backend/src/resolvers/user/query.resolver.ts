import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async users(_: unknown, __: unknown, { prisma }: YogaContextReturnType) {
    const u = await prisma.user.findMany();
    return u;
  },
};
