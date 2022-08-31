import { GraphQLYogaError } from "@graphql-yoga/node";
import { Prisma, PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import { unlink } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { pick } from "lodash";
import ms from "ms";
import path from "path";
import logger from "../logger";
import {
  AuthenticationError,
  NoContentError,
  UserInputError,
  ValidationError,
} from "../model";
import {
  createUser,
  followTo,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithInfo,
  getUserById,
  getUserByIdWithInfo,
  getUserFollowCount,
  getUserFollowersCount,
  getUserFollowingsCount,
  getUsersOnCursor,
  getUsersOnOffset,
  sendResetPasswordVerificationCode,
  sendUserVerificationCode,
  unfollowTo,
  updateUserAbout,
  updateUserName,
  userResetPassword,
  verifyAuthorStatus,
} from "../services/user.service";
import {
  generateToken,
  imageUpload,
  isVerifyResetPassword,
  nanoid,
  verifyRefreshToken,
} from "../utils";
import config from "../utils/config";
import {
  ALREADY_FOLLOWED_ERR_MSG,
  ALREADY_UN_FOLLOWED_ERR_MSG,
  AUTH_FAIL_ERR_MSG,
  CREATION_ERR_MSG,
  EXIST_ERR_MSG,
  FETCH_ERR_MSG,
  FOLLOW_ERR_MSG,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIAL,
  NOT_EXIST_ERR_MSG,
  REFRESH_TOKEN_KEY_NAME,
  RESET_PASSWORD_VERIFICATION_KEY_NAME,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  USER_VERIFICATION_KEY_NAME,
} from "../utils/constants";
import { EAuthorStatus, EUserRole } from "../utils/enums";
import {
  ICursorQueryParams,
  ILoginInput,
  IOffsetQueryParams,
  IRegisterInput,
  IUserPayload,
} from "../utils/interfaces";
import redisClient from "../utils/redis";
import { getGraphqlYogaError } from "../validations";
import {
  cursorQueryParamsSchema,
  offsetQueryParamsSchema,
} from "../validations/post.validation";
import {
  loginSchema,
  registerSchema,
  resendActivationSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../validations/user.validation";

async function generateTokens(user: IUserPayload) {
  const accessToken = await generateToken(
    user,
    config.ACCESS_TOKEN_SECRET_KEY,
    config.ACCESS_TOKEN_EXPIRES
  );

  const refreshToken = await generateToken(
    user,
    config.REFRESH_TOKEN_SECRET_KEY,
    config.REFRESH_TOKEN_EXPIRES,
    true
  );

  return { accessToken, refreshToken } as const;
}

export async function registerCtrl(
  prisma: PrismaClient,
  args: IRegisterInput,
  host: string
) {
  try {
    const { email, password, mobile, name } = args;
    await registerSchema.validate(args, { abortEarly: false });
    const isUserExist = await getUserByEmailOrMobile(prisma, email, mobile);

    if (isUserExist) {
      if (isUserExist.authorStatus === EAuthorStatus.Verified) {
        return new GraphQLYogaError(EXIST_ERR_MSG("User"));
      }
      await sendUserVerificationCode(isUserExist.id, isUserExist.email, host);
      return isUserExist.id;
    }

    const hashPassword = await hash(password);

    const user = await createUser(prisma, {
      email,
      mobile,
      name,
      password: hashPassword,
    });

    await sendUserVerificationCode(user.id, email, host);

    return user.id;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      CREATION_ERR_MSG("User"),
      "Register input"
    );
  }
}

export async function resendActivationCtrl(
  prisma: PrismaClient,
  userId: string,
  host: string
) {
  try {
    await resendActivationSchema.validate({ userId }, { abortEarly: false });
    const isUserExist = await getUserById(prisma, userId);
    if (!isUserExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("User"));
    }

    if (isUserExist.authorStatus === EAuthorStatus.Verified) {
      return new GraphQLYogaError("User already verified");
    }

    await sendUserVerificationCode(isUserExist.id, isUserExist.email, host);
    return userId;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, "Resend activation failed");
  }
}
export async function verifyUserCtrl(
  prisma: PrismaClient,
  userId: string,
  code: string
) {
  try {
    await verifyUserSchema.validate({ userId, code }, { abortEarly: false });
    const isUserExist = await getUserById(prisma, userId);

    if (!isUserExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("User"));
    }

    if (isUserExist.authorStatus === EAuthorStatus.Verified) {
      return new GraphQLYogaError("User already verified");
    }

    const VRKey = USER_VERIFICATION_KEY_NAME(userId);

    const redisCode = await redisClient.get(VRKey);

    if (code !== redisCode) {
      return new GraphQLYogaError("User verification failed");
    }

    await redisClient.del(VRKey);
    await verifyAuthorStatus(prisma, userId);

    // pubSub.publish(SUBSCRIPTION_USER_VERIFICATION(userId), {
    //   userVerify: {
    //     userId,
    //     mutation: EAuthorStatus.Verified,
    //   },
    // });
    return userId;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, "User verification failed");
  }
}

export async function loginCtrl(
  prisma: PrismaClient,
  args: ILoginInput,
  res: ServerResponse
) {
  try {
    const { emailOrMobile, password } = args;

    await loginSchema.validate(args, { abortEarly: false });

    const isUserExist = await getUserByEmailOrMobileWithInfo(
      prisma,
      emailOrMobile,
      emailOrMobile
    );

    if (!isUserExist) {
      return new GraphQLYogaError(INVALID_CREDENTIAL);
    }

    const isValidPassword = await verify(isUserExist.password, password);

    if (!isValidPassword) {
      return new GraphQLYogaError(INVALID_CREDENTIAL);
    }

    const user = {
      ...pick(isUserExist, [
        "id",
        "name",
        "mobile",
        "email",
        "role",
        "authorStatus",
        "about",
        "avatar",
      ]),
    } as IUserPayload;
    const { accessToken, refreshToken } = await generateTokens(user);

    // @ts-ignore
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, // https
      sameSite: "None", // cross-site cookie
      maxAge: ms(config.REFRESH_TOKEN_EXPIRES), // cookie expiry
    });
    return accessToken;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, AUTH_FAIL_ERR_MSG, "Login input");
  }
}

export async function logoutCtrl(
  user: IUserPayload,
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    // @ts-ignore
    const jwt = req.cookies?.jwt;
    if (!jwt) {
      return new NoContentError("Logout failed");
    }

    await redisClient.del(REFRESH_TOKEN_KEY_NAME(user.id));

    // @ts-ignore
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

    return user.id;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      UN_AUTH_ERR_MSG,
      undefined,
      UN_AUTH_EXT_ERR_CODE
    );
  }
}

export async function tokenCtrl(prisma: PrismaClient, refreshToken: any) {
  try {
    if (!refreshToken) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    const user = await verifyRefreshToken(refreshToken);
    const isExist = await getUserById(prisma, user.id);

    if (!isExist) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    const accessToken = await generateToken(
      user,
      config.ACCESS_TOKEN_SECRET_KEY,
      config.ACCESS_TOKEN_EXPIRES
    );

    return accessToken;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      UN_AUTH_ERR_MSG,
      undefined,
      UN_AUTH_EXT_ERR_CODE
    );
  }
}

export async function resetPasswordCtrl(
  prisma: PrismaClient,
  userId: string,
  oldPassword: string,
  newPassword: string,
  host?: string
) {
  try {
    await resetPasswordSchema.validate(
      { oldPassword, newPassword },
      { abortEarly: false }
    );
    const isExist = await getUserById(prisma, userId);

    if (!isExist) {
      return new ValidationError(NOT_EXIST_ERR_MSG("User"));
    }

    const isValidPassword = await verify(isExist.password, oldPassword);
    if (!isValidPassword) {
      return new UserInputError("Invalid credentials");
    }

    const hashNewPassword = await hash(newPassword);
    await sendResetPasswordVerificationCode(
      userId,
      isExist.email,
      hashNewPassword,
      host
    );

    return "Reset password verification code sent. Check the email.";
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      "Failed to reset password",
      undefined,
      INTERNAL_SERVER_ERROR
    );
  }
}

export async function verifyResetPasswordCtrl(
  prisma: PrismaClient,
  userId: string,
  code: string
) {
  try {
    const isUserExist = await getUserById(prisma, userId);

    if (!isUserExist) {
      return new ValidationError(NOT_EXIST_ERR_MSG("User"));
    }

    const key = RESET_PASSWORD_VERIFICATION_KEY_NAME(userId);

    const data = await redisClient.get(key);
    const result = data ? JSON.parse(data) : null;

    if (!result || !isVerifyResetPassword(result) || result.code !== code) {
      return new ValidationError("Reset password verification failed");
    }
    await redisClient.del(key);
    await userResetPassword(prisma, userId, result.hash);

    return "Reset password successfully.";
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      "Reset password verification failed",
      undefined,
      INTERNAL_SERVER_ERROR
    );
  }
}

export async function uploadAvatar(
  prisma: PrismaClient,
  avatar: File,
  user: IUserPayload
) {
  try {
    const isExist = await getUserByIdWithInfo(prisma, user.id);

    if (!isExist) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, height, width } = await imageUpload(avatar, dest, uId);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        avatar: {
          upsert: {
            create: {
              url: `images/${name}`,
              width: width || 200,
              height: height || 200,
            },
            update: {
              url: `images/${name}`,
              width: width || 200,
              height: height || 200,
            },
          },
        },
      },
      include: { avatar: true },
    });

    if (updatedUser.avatar && isExist.avatar) {
      const oldAvatarPath = `${process.cwd()}/${isExist.avatar.url}`;
      unlink(oldAvatarPath, (linkErr) => {
        if (linkErr) {
          console.log(linkErr);
        }
      });
    }

    return pick(updatedUser.avatar, ["id", "url", "height", "width"]);
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      UN_AUTH_ERR_MSG,
      undefined,
      UN_AUTH_EXT_ERR_CODE
    );
  }
}

export async function updateNameCtrl(
  prisma: PrismaClient,
  name: string,
  user: IUserPayload
) {
  try {
    const isExist = await getUserByIdWithInfo(prisma, user.id);

    if (!isExist) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    const updatedUser = await updateUserName(prisma, isExist.id, name);
    return updatedUser.name;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      UN_AUTH_ERR_MSG,
      undefined,
      UN_AUTH_EXT_ERR_CODE
    );
  }
}

export async function updateAboutCtrl(
  prisma: PrismaClient,
  value: string,
  user: IUserPayload
) {
  try {
    const isExist = await getUserByIdWithInfo(prisma, user.id);

    if (!isExist) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG, {
        code: UN_AUTH_EXT_ERR_CODE,
      });
    }

    const updatedUser = await updateUserAbout(prisma, isExist.id, value);
    return updatedUser.about;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(
      error,
      UN_AUTH_ERR_MSG,
      undefined,
      UN_AUTH_EXT_ERR_CODE
    );
  }
}

export async function followRequestCtrl(
  prisma: PrismaClient,
  toId: string,
  user: IUserPayload
) {
  try {
    const isExist = await getUserByIdWithInfo(prisma, toId);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("User"));
    }

    const index = isExist.followers.findIndex(
      (follower) => follower.id === user.id
    );

    if (index !== -1) {
      return new GraphQLYogaError(ALREADY_FOLLOWED_ERR_MSG);
    }

    const followedUser = await followTo(prisma, toId, user.id);
    return followedUser;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, FOLLOW_ERR_MSG);
  }
}

export async function unfollowRequestCtrl(
  prisma: PrismaClient,
  toId: string,
  user: IUserPayload
) {
  try {
    const isExist = await getUserByIdWithInfo(prisma, toId);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("User"));
    }

    const index = isExist.followers.findIndex(
      (follower) => follower.id === user.id
    );

    if (index === -1) {
      return new GraphQLYogaError(ALREADY_UN_FOLLOWED_ERR_MSG);
    }

    await unfollowTo(prisma, toId, user.id);
    return toId;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, FOLLOW_ERR_MSG);
  }
}

export async function getUsersOnOffsetCtrl(
  prisma: PrismaClient,
  params: IOffsetQueryParams,
  userId?: string
) {
  try {
    await offsetQueryParamsSchema.validate(params, {
      abortEarly: false,
    });

    const { limit, page } = params;
    const condition = {
      where: {
        role: { not: EUserRole.Admin },
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
    return getGraphqlYogaError(error, FETCH_ERR_MSG("users"));
  }
}

export async function suggestAuthorsToUserOnOffsetCtrl(
  prisma: PrismaClient,
  params: IOffsetQueryParams,
  userId: string
) {
  try {
    await offsetQueryParamsSchema.validate(params, {
      abortEarly: false,
    });

    const { limit, page } = params;
    const condition = {
      where: {
        NOT: {
          followers: { some: { id: userId } },
        },
        role: { not: EUserRole.Admin },
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
    return getGraphqlYogaError(error, FETCH_ERR_MSG("users"));
  }
}

export async function authorFollowersOnCursorCtrl(
  prisma: PrismaClient,
  params: ICursorQueryParams,
  userId: string
) {
  try {
    await cursorQueryParamsSchema.validate(params, {
      abortEarly: false,
    });

    const condition = {
      where: {
        followings: { some: { id: userId } },
        role: { not: EUserRole.Admin },
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
    return getGraphqlYogaError(error, FETCH_ERR_MSG("authors followers"));
  }
}

export async function authorFollowingsOnCursorCtrl(
  prisma: PrismaClient,
  params: ICursorQueryParams,
  userId: string
) {
  try {
    await cursorQueryParamsSchema.validate(params, {
      abortEarly: false,
    });

    const condition = {
      where: {
        followers: { some: { id: userId } },
        role: { not: EUserRole.Admin },
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
    return getGraphqlYogaError(error, FETCH_ERR_MSG("authors following"));
  }
}

export async function userResultCtrl(
  prisma: PrismaClient,
  forUserId: string,
  userId?: string
) {
  try {
    if (userId) {
      const [followerCount, hasFollow] = await prisma.$transaction([
        getUserFollowersCount(prisma, forUserId),
        prisma.user.findFirst({
          where: {
            id: forUserId,
            followers: { some: { id: userId } },
          },
        }),
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
    return getGraphqlYogaError(error, FETCH_ERR_MSG("user result"));
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
    return getGraphqlYogaError(error, FETCH_ERR_MSG("user follow"));
  }
}

export async function userFollowersCtrl(
  prisma: PrismaClient,

  userId: string
) {
  try {
    const followerCount = await getUserFollowersCount(prisma, userId);

    return followerCount?._count.followers ?? 0;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("user followers"));
  }
}

export async function userFollowingsCtrl(prisma: PrismaClient, userId: string) {
  try {
    const followerCount = await getUserFollowingsCount(prisma, userId);

    return followerCount?._count.followings ?? 0;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("user followings"));
  }
}
