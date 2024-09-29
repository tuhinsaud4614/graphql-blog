import {
  tagCountService,
  tagsByTextWithOffsetService,
  tagsWithOffsetService,
} from "@/services/tag";
import type {
  OffsetParams,
  TagsByTextWithOffsetParams,
  YogaContext,
} from "@/utils/types";

export const Query = {
  async tagsWithOffset(
    _: unknown,
    params: OffsetParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await tagsWithOffsetService(prisma, params);
  },

  async tagsByTextWithOffset(
    _: unknown,
    params: TagsByTextWithOffsetParams,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    return await tagsByTextWithOffsetService(prisma, params);
  },

  async tagCount(
    _: unknown,
    __: unknown,
    { prisma }: YogaContext,
    ___: unknown,
  ) {
    const result = await tagCountService(prisma);
    return result;
  },
};
