import { Prisma, PrismaClient } from "@prisma/client";
import logger from "../logger";
import { getManyTags } from "../services/tag.service";
import { FETCH_ERR_MSG } from "../utils/constants";
import { IOffsetPageInfo, IOffsetQueryParams } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { offsetQueryParamsSchema } from "../validations/post.validation";

// Offset based pagination start
export async function getTagsOnOffsetCtrl(
  prisma: PrismaClient,
  params: IOffsetQueryParams
) {
  try {
    await offsetQueryParamsSchema.validate(params, { abortEarly: false });

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
