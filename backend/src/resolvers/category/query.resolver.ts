import {
  getCategoriesByTextOnOffsetCtrl,
  getCategoriesOnOffsetCtrl,
} from "../../controller/category.controller";
import { IOffsetQueryParams } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Query = {
  async categoriesOnOffset(
    _: any,
    params: IOffsetQueryParams,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getCategoriesOnOffsetCtrl(prisma, params);
    return result;
  },

  async categoriesByTextOnOffset(
    _: any,
    params: IOffsetQueryParams & { text: string },
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getCategoriesByTextOnOffsetCtrl(prisma, params);
    return result;
  },
};
