import { Prisma, PrismaClient } from "@prisma/client";

import logger from "@/logger";
import { getManyTags } from "@/services/tag.service";
import { FETCH_ERR_MSG } from "@/utils/constants";
import { IOffsetPageInfo, OffsetParams } from "@/utils/interfaces";
import { getGraphqlYogaError } from "@/validations";
import { offsetParamsSchema } from "@/validations/post.validation";

// Offset based pagination start
export async function getTagsOnOffsetCtrl(
  prisma: PrismaClient,
  params: OffsetParams,
) {
  try {
    await offsetParamsSchema.validate(params, { abortEarly: false });

    const { limit, page } = params;

    let args: Prisma.TagFindManyArgs = {
      orderBy: { updatedAt: "desc" },
    };

    // limit && page all have value return paginate value

    const count = await prisma.tag.count();
    if (limit && page) {
      args = {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      };
      const result = await getManyTags(prisma, args);

      return {
        results: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        } as IOffsetPageInfo,
      };
    }

    const results = await getManyTags(prisma, args);

    return { results, total: count };
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("tags"));
  }
}

export async function getTagsByTextOnOffsetCtrl(
  prisma: PrismaClient,
  { text, ...rest }: OffsetParams & { text: string },
) {
  try {
    await offsetParamsSchema.validate(rest, { abortEarly: false });

    const { limit, page } = rest;

    const condition: Prisma.TagWhereInput = {
      title: { contains: text, mode: "insensitive" },
    };
    let args: Prisma.TagFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: condition,
    };

    // limit && page all have value return paginate value

    const count = await prisma.tag.count({ where: condition });
    if (limit && page) {
      args = {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      };
      const result = await getManyTags(prisma, args);

      return {
        results: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        } as IOffsetPageInfo,
      };
    }

    const results = await getManyTags(prisma, args);

    return { results, total: count };
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("tags"));
  }
}
