import {
  categoriesByTextWithOffsetService,
  categoriesWithOffsetService,
} from "@/services/category";
import type {
  CategoriesByTextParams,
  OffsetParams,
  YogaContext,
} from "@/utils/types";

export const Query = {
  async categoriesWithOffset(
    _: unknown,
    params: OffsetParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    const result = await categoriesWithOffsetService(prisma, params);
    return result;
  },

  async categoriesByTextOnOffset(
    _: any,
    params: CategoriesByTextParams,
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await categoriesByTextWithOffsetService(prisma, params);
    return result;
  },
};
