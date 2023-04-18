import {
  getCategoriesByTextOnOffsetCtrl,
  getCategoriesWithOffsetController,
} from "@/controller/category.controller";
import type { OffsetParams, YogaContext } from "@/utils/types";

export const Query = {
  async categoriesOnOffset(
    _: any,
    params: OffsetParams,
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await getCategoriesWithOffsetController(prisma, params);
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
