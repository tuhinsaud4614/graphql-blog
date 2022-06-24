import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { omit } from "lodash";
import * as yup from "yup";
import {
  createUser,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithAvatar,
  getUserById,
} from "../services/user.service";
import { formatYupError, generateToken, verifyRefreshToken } from "../utils";
import {
  CREATION_ERR_MSG,
  EXIST_ERR_MSG,
  INVALID_CREDENTIAL,
  UN_AUTHORIZED_ERR_MSG,
} from "../utils/constants";
import { ILoginInput, IRegisterInput, IUserPayload } from "../utils/interfaces";
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

    const hashPassword = await hash(password, 12);

    const user = await createUser(prisma, {
      email,
      mobile,
      role,
      name,
      password: hashPassword,
    });

    return user.id;
  } catch (error: any) {
    console.log(error);
    if (error instanceof yup.ValidationError) {
      const err = formatYupError(error);
      return new GraphQLYogaError(err);
    }
    return new GraphQLYogaError(CREATION_ERR_MSG("User"));
  }
}

export async function loginCtrl(prisma: PrismaClient, args: ILoginInput) {
  try {
    const { emailOrMobile, password } = args;

    await loginSchema.validate(args, { abortEarly: false });

    const isUserExist = await getUserByEmailOrMobileWithAvatar(
      prisma,
      emailOrMobile,
      emailOrMobile
    );

    if (!isUserExist) {
      return new GraphQLYogaError(INVALID_CREDENTIAL);
    }

    const isValidPassword = await compare(password, isUserExist.password);

    if (!isValidPassword) {
      return new GraphQLYogaError(INVALID_CREDENTIAL);
    }
    const user = {
      ...omit(isUserExist, ["password", "avatarId", "createdAt", "updatedAt"]),
      avatar: isUserExist.avatar,
    } as IUserPayload;
    const { accessToken, refreshToken } = await generateTokens(user);

    return { ...user, accessToken, refreshToken };
  } catch (error: any) {
    console.log(error);
    if (error instanceof yup.ValidationError) {
      const err = formatYupError(error);
      return new GraphQLYogaError(err);
    }
    return new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
  }
}

export async function tokenCtrl(prisma: PrismaClient, refreshToken: string) {
  try {
    const user = await verifyRefreshToken(refreshToken);
    const isExist = await getUserById(prisma, user.id);

    if (!isExist) {
      return new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
    }

    const { accessToken, refreshToken: rfToken } = await generateTokens(user);

    return { accessToken, refreshToken: rfToken };
  } catch (error) {
    return new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
  }
}
