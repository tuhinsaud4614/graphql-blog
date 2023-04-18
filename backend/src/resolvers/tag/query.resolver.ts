import {
  getTagsByTextOnOffsetCtrl,
  getTagsOnOffsetCtrl,
} from "@/controller/tag.controller";
import { OffsetParams } from "@/utils/interfaces";
import { YogaContext } from "@/utils/types";

export const Query = {
  async tagsOnOffset(
    _: any,
    params: OffsetParams,
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await getTagsOnOffsetCtrl(prisma, params);
    return result;
  },

  async tagsByTextOnOffset(
    _: any,
    params: OffsetParams & { text: string },
    { prisma }: YogaContext,
    ___: any,
  ) {
    const result = await getTagsByTextOnOffsetCtrl(prisma, params);
    return result;
  },
};
