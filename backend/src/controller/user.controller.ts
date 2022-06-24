import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { omit } from "lodash";
import * as yup from "yup";
import {
  createUser,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithAvatar,
} from "../services/user.service";
import { formatYupError, generateToken } from "../utils";
import {
  CREATION_ERR_MSG,
  EXIST_ERR_MSG,
  INVALID_CREDENTIAL,
} from "../utils/constants";
import { ILoginInput, IRegisterInput, IUserPayload } from "../utils/interfaces";
import { loginSchema, registerSchema } from "../validations/user.validation";

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

    return { ...user, accessToken, refreshToken };
  } catch (error: any) {
    console.log(error);
    if (error instanceof yup.ValidationError) {
      const err = formatYupError(error);
      return new GraphQLYogaError(err);
    }
    return new GraphQLYogaError(CREATION_ERR_MSG("User"));
  }
}
