import { Prisma, PrismaClient } from "@prisma/client";

import logger from "@/logger";
import {
  getUserFollowCount,
  getUserFollowersCount,
  getUserFollowingsCount,
  getUsersOnCursor,
  getUsersOnOffset,
  isFollowTheUser,
} from "@/services/user.service";
import { generateFetchErrorMessage } from "@/utils/constants";
import type { CursorParams, OffsetParams } from "@/utils/types";
import {
  cursorParamsSchema,
  getGraphqlYogaError,
  offsetParamsSchema,
} from "@/validations";

export async function suggestAuthorsToUserOnOffsetCtrl(
  prisma: PrismaClient,
  params: OffsetParams,
  userId: string,
) {
  try {
    await offsetParamsSchema.validate(params, {
      abortEarly: false,
    });

    const { limit, page } = params;
    const condition = {
      where: {
        NOT: {
          followers: { some: { id: userId } },
        },
        role: { not: "ADMIN" },
        id: { not: userId },
      } as Prisma.UserWhereInput,
    };
    let args: Prisma.UserFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.user.count(condition);
    if (count === 0) {
      return { data: [], total: count };
    }

    const result = await getUsersOnOffset(prisma, count, page, limit, args);
    return result;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateFetchErrorMessage("users"));
  }
}

export async function authorFollowersOnCursorCtrl(
  prisma: PrismaClient,
  params: CursorParams,
  userId: string,
) {
  try {
    await cursorParamsSchema.validate(params, {
      abortEarly: false,
    });

    const condition = {
      where: {
        followings: { some: { id: userId } },
        role: { not: "ADMIN" },
        id: { not: userId },
      } as Prisma.UserWhereInput,
    };

    const args: Prisma.UserFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.user.count(condition);
    const result = await getUsersOnCursor(prisma, params, args, count);
    return result;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      generateFetchErrorMessage("authors followers"),
    );
  }
}

export async function authorFollowingsOnCursorCtrl(
  prisma: PrismaClient,
  params: CursorParams,
  userId: string,
) {
  try {
    await cursorParamsSchema.validate(params, {
      abortEarly: false,
    });

    const condition = {
      where: {
        followers: { some: { id: userId } },
        role: { not: "ADMIN" },
        id: { not: userId },
      } as Prisma.UserWhereInput,
    };

    const args: Prisma.UserFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.user.count(condition);
    const result = await getUsersOnCursor(prisma, params, args, count);
    return result;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      generateFetchErrorMessage("authors following"),
    );
  }
}

export async function userResultCtrl(
  prisma: PrismaClient,
  forUserId: string,
  userId?: string,
) {
  try {
    if (userId) {
      const [followerCount, hasFollow] = await prisma.$transaction([
        getUserFollowersCount(prisma, forUserId),
        isFollowTheUser(prisma, userId, forUserId),
      ]);

      return {
        followerCount: followerCount?._count.followers ?? 0,
        hasFollow: !!hasFollow,
      };
    }

    const followerCount = await getUserFollowersCount(prisma, forUserId);

    return {
      followerCount: followerCount?._count.followers ?? 0,
      hasFollow: false,
    };
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateFetchErrorMessage("user result"));
  }
}

export async function userFollowCtrl(prisma: PrismaClient, userId: string) {
  try {
    const counts = await getUserFollowCount(prisma, userId);

    return {
      followerCount: counts?._count.followers ?? 0,
      followingCount: counts?._count.followings ?? 0,
    };
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, generateFetchErrorMessage("user follow"));
  }
}

export async function userFollowersCtrl(
  prisma: PrismaClient,

  userId: string,
) {
  try {
    const followerCount = await getUserFollowersCount(prisma, userId);

    return followerCount?._count.followers ?? 0;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      generateFetchErrorMessage("user followers"),
    );
  }
}

export async function userFollowingsCtrl(prisma: PrismaClient, userId: string) {
  try {
    const followerCount = await getUserFollowingsCount(prisma, userId);

    return followerCount?._count.followings ?? 0;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      generateFetchErrorMessage("user followings"),
    );
  }
}
