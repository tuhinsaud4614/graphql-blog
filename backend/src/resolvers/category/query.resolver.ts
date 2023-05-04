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

  async categoriesByTextWithOffset(
    _: unknown,
    params: CategoriesByTextParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    const result = await categoriesByTextWithOffsetService(prisma, params);
    return result;
  },
};
