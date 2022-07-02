import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import { unlink } from "fs";
import { has, pick } from "lodash";
import path from "path";
import {
  createUser,
  followTo,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithInfo,
  getUserById,
  getUserByIdWithInfo,
  unfollowTo,
} from "../services/user.service";
import {
  AsyncImageSize,
  fileUpload,
  generateToken,
  maxFileSize,
  nanoid,
  verifyRefreshToken,
} from "../utils";
import {
  ALREADY_FOLLOWED_ERR_MSG,
  ALREADY_UN_FOLLOWED_ERR_MSG,
  AUTH_FAIL_ERR_MSG,
  CREATION_ERR_MSG,
  EXIST_ERR_MSG,
  FOLLOW_ERR_MSG,
  IMAGE_MIMES,
  INVALID_CREDENTIAL,
  NOT_EXIST_ERR_MSG,
  NOT_IMG_ERR_MSG,
  TOO_LARGE_FILE_ERR_MSG,
  UN_AUTH_ERR_MSG,
  USER_FOLLOWED_ERR_MSG,
} from "../utils/constants";
import { EUserRole } from "../utils/enums";
import { ILoginInput, IRegisterInput, IUserPayload } from "../utils/interfaces";
import { CustomError, getGraphqlYogaError } from "../validations";
import { loginSchema, registerSchema } from "../validations/user.validation";

async function generateTokens(user: IUserPayload) {
  const accessToken = await generateToken(
    user,
    process.env.ACCESS_TOKEN_SECRET_KEY!,
    process.env.ACCESS_TOKEN_EXPIRES!
  );

  const refreshToken = await generateToken(
    user,
    process.env.REFRESH_TOKEN_SECRET_KEY!,
    process.env.REFRESH_TOKEN_EXPIRES!,
    true
  );

  return { accessToken, refreshToken } as const;
}

export async function registerCtrl(prisma: PrismaClient, args: IRegisterInput) {
  try {
    const { email, password, mobile, role, name } = args;
    await registerSchema.validate(args, { abortEarly: false });
    const isUserExist = await getUserByEmailOrMobile(prisma, email, mobile);

    if (isUserExist) {
      return new GraphQLYogaError(EXIST_ERR_MSG("User"));
    }

    const hashPassword = await hash(password);

    const user = await createUser(prisma, {
      email,
      mobile,
      role,
      name,
      password: hashPassword,
    });

    return user.id;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(
      error,
      CREATION_ERR_MSG("User"),
      "Register input"
    );
  }
}

export async function loginCtrl(prisma: PrismaClient, args: ILoginInput) {
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
        "followers",
        "followings",
      ]),
    } as IUserPayload;
    const { accessToken, refreshToken } = await generateTokens(user);

    return { accessToken, refreshToken };
  } catch (error: any) {
    console.log(error);
    return getGraphqlYogaError(error, AUTH_FAIL_ERR_MSG, "Login input");
  }
}

export async function tokenCtrl(prisma: PrismaClient, refreshToken: string) {
  try {
    const user = await verifyRefreshToken(refreshToken);
    const isExist = await getUserById(prisma, user.id);

    if (!isExist) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    const { accessToken, refreshToken: rfToken } = await generateTokens(user);

    return { accessToken, refreshToken: rfToken };
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, UN_AUTH_ERR_MSG);
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
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, filePath } = await fileUpload(avatar, {
      dest,
      name: uId,
      filterFunction(newFile, cb) {
        const { type, size } = newFile;
        if (!has(IMAGE_MIMES, type)) {
          return cb(new CustomError(NOT_IMG_ERR_MSG));
        }

        if (size > maxFileSize(5)) {
          return cb(new CustomError(TOO_LARGE_FILE_ERR_MSG("Image", "5 Mb")));
        }

        return cb(null, true);
      },
    });

    const dimensions = await AsyncImageSize(filePath);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        avatar: {
          upsert: {
            create: {
              url: `images/${name}`,
              width: dimensions?.width || 200,
              height: dimensions?.height || 200,
            },
            update: {
              url: `images/${name}`,
              width: dimensions?.width || 200,
              height: dimensions?.height || 200,
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
    console.log(error);
    return getGraphqlYogaError(error, UN_AUTH_ERR_MSG);
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

    if (isExist.role === EUserRole.User) {
      return new GraphQLYogaError(USER_FOLLOWED_ERR_MSG);
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
    console.log(error);
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
    console.log(error);
    return getGraphqlYogaError(error, FOLLOW_ERR_MSG);
  }
}
