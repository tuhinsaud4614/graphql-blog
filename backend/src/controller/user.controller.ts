import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import { pick } from "lodash";
import {
  createUser,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithInfo,
  getUserById,
} from "../services/user.service";
import { generateToken, verifyRefreshToken } from "../utils";
import {
  AUTH_FAIL_ERR_MSG,
  CREATION_ERR_MSG,
  EXIST_ERR_MSG,
  INVALID_CREDENTIAL,
  UN_AUTH_ERR_MSG,
} from "../utils/constants";
import { ILoginInput, IRegisterInput, IUserPayload } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
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
        "slug",
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
