import {
  getTagsByTextOnOffsetCtrl,
  getTagsOnOffsetCtrl,
} from "@/controller/tag.controller";
import { IOffsetQueryParams } from "@/utils/interfaces";
import { YogaContextReturnType } from "@/utils/types";

export const Query = {
  async tagsOnOffset(
    _: any,
    params: IOffsetQueryParams,
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getTagsOnOffsetCtrl(prisma, params);
    return result;
  },

  async tagsByTextOnOffset(
    _: any,
    params: IOffsetQueryParams & { text: string },
    { prisma }: YogaContextReturnType,
    ___: any
  ) {
    const result = await getTagsByTextOnOffsetCtrl(prisma, params);
    return result;
  },
};
