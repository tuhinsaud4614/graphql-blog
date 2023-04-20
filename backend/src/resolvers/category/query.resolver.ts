import { getCategoriesByTextOnOffsetCtrl } from "@/controller/category.controller";
import CategoryService from "@/services/category";
import type { OffsetParams, YogaContext } from "@/utils/types";

export const Query = {
  async categoriesWithOffset(
    _: unknown,
    params: OffsetParams,
    __: unknown,
    ___: unknown,
  ) {
    const result = await CategoryService.categoriesWithOffset(params);
    return result;
  },

  async categoriesByTextOnOffset(
    _: any,
    params: OffsetParams & { text: string },
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await getCategoriesByTextOnOffsetCtrl(prisma, params);
    return result;
  },
};
