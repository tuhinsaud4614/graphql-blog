import { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import { Response } from "express";
import { pick } from "lodash";
import ms from "ms";

import logger from "@/logger";
import { ForbiddenError, UnknownError, UserInputError } from "@/model";
import {
  createUser,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithInfo,
  getUserById,
  updateAuthorStatusToVerified,
} from "@/repositories/user";
import { formatError, generateToken } from "@/utils";
import config from "@/utils/config";
import {
  AUTH_FAIL_ERR_MSG,
  INVALID_CREDENTIAL,
  generateCreationErrorMessage,
  generateExistErrorMessage,
  generateNotExistErrorMessage,
  generateUserVerificationKey,
} from "@/utils/constants";
import { EAuthorStatus } from "@/utils/enums";
import { IUserPayload } from "@/utils/interfaces";
import redisClient from "@/utils/redis";
import {
  IDParams,
  LoginInput,
  RegisterInput,
  VerifyUserParams,
} from "@/utils/types";
import { idParamsSchema } from "@/validations";
import {
  loginSchema,
  registerSchema,
  verifyUserSchema,
} from "@/validations/user";

import { sendVerificationCodeService } from "./mail";

async function generateTokensService(user: IUserPayload) {
  const accessToken = await generateToken(
    user,
    config.ACCESS_TOKEN_SECRET_KEY,
    config.ACCESS_TOKEN_EXPIRES,
  );

  const refreshToken = await generateToken(
    user,
    config.REFRESH_TOKEN_SECRET_KEY,
    config.REFRESH_TOKEN_EXPIRES,
    true,
  );

  return { accessToken, refreshToken } as const;
}

/**
 * This is a TypeScript function that handles user registration, including validation, checking for
 * existing users, creating new users, and sending verification codes.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for Node.js and TypeScript that provides autocompletion and type checking for database queries.
 * @param {RegisterInput} params - The `params` parameter is an object containing the user registration
 * input data, including `email`, `password`, `mobile`, and `name`.
 * @param {string} host - The `host` parameter is a string that represents the host URL of the
 * application. It is used in the `sendVerificationCodeService` function to generate a verification
 * link that is sent to the user's email address.
 * @returns either the ID of the newly created user or an error message if there was an error during
 * the registration process.
 */
export async function userRegistrationService(
  prisma: PrismaClient,
  params: RegisterInput,
  host: string,
) {
  try {
    await registerSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "register user" });
  }

  try {
    const { email, password, mobile, name } = params;
    const isUserExist = await getUserByEmailOrMobile(prisma, email, mobile);

    if (isUserExist?.authorStatus === EAuthorStatus.Verified) {
      return new ForbiddenError(generateExistErrorMessage("User"));
    }

    if (isUserExist) {
      await sendVerificationCodeService(
        isUserExist.id,
        isUserExist.email,
        host,
      );
      return isUserExist.id;
    }

    const hashPassword = await hash(password);

    const user = await createUser(prisma, {
      email,
      mobile,
      name,
      password: hashPassword,
    });

    await sendVerificationCodeService(user.id, email, host);

    return user.id;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateCreationErrorMessage("User"));
  }
}

/**
 * This function resends an activation code to a user's email if they have not yet been verified.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for Node.js and TypeScript that provides autocompletion and type checking. It allows you to interact
 * with your database using a fluent and intuitive API.
 * @param {IDParams} params - The `params` parameter is an object containing an `id` property, which is
 * used to identify the user whose activation code needs to be resent.
 * @param {string} host - The `host` parameter is a string that represents the base URL of the
 * application or website where the activation email will be sent from. It is used in the
 * `sendVerificationCodeService` function to construct the activation link that will be included in the
 * email.
 * @returns either an error object or the user ID of the user whose activation is being resent.
 */
export async function resendActivationService(
  prisma: PrismaClient,
  params: IDParams,
  host: string,
) {
  try {
    await idParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "resend activation" });
  }

  try {
    const user = await getUserById(prisma, params.id);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const { authorStatus, email, id } = user;

    if (authorStatus === EAuthorStatus.Verified) {
      return new ForbiddenError("User already verified");
    }

    await sendVerificationCodeService(id, email, host);

    return id;
  } catch (error) {
    logger.error(error);
    return new UnknownError("Resend activation failed");
  }
}

/**
 * This function verifies a user's identity by checking their verification code against a Redis key and
 * updating their author status to "verified" in a Prisma database.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for TypeScript and Node.js that can be used to interact with a database using Prisma's query
 * builder.
 * @param {VerifyUserParams} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns either an error object or the user ID if the verification process is successful.
 */
export async function verifyUserService(
  prisma: PrismaClient,
  params: VerifyUserParams,
) {
  try {
    await verifyUserSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "verify user" });
  }

  try {
    const { id, code } = params;
    const user = await getUserById(prisma, id);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const { authorStatus } = user;

    if (authorStatus === EAuthorStatus.Verified) {
      return new ForbiddenError("User already verified");
    }

    const VRKey = generateUserVerificationKey(id);

    const redisCode = await redisClient.get(VRKey);

    if (code !== redisCode) {
      return new ForbiddenError("User verification failed");
    }

    await redisClient.del(VRKey);
    await updateAuthorStatusToVerified(prisma, id);

    return id;
  } catch (error) {
    logger.error(error);
    return new UnknownError("User verification failed");
  }
}

/**
 * This is a TypeScript function that handles user login, validates user input, checks user
 * credentials, generates access and refresh tokens, and sets a cookie with the refresh token.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {LoginInput} params - The `params` parameter is an object that contains the user's login
 * credentials, including their email or mobile number and password. It is of type `LoginInput`.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object from the
 * Express.js framework. It is used to send the HTTP response back to the client after the login
 * operation is completed. In this case, it is used to set a cookie containing the refresh token.
 * @returns either an access token or an error object. If the login input parameters are valid and the
 * user exists with a valid password, the function generates an access token and a refresh token, sets
 * the refresh token as a cookie, and returns the access token. If there is an error during the
 * validation or authentication process, the function returns an error object.
 */
export async function loginService(
  prisma: PrismaClient,
  params: LoginInput,
  res: Response,
) {
  try {
    await loginSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "login user" });
  }

  try {
    const { emailOrMobile } = params;

    const user = await getUserByEmailOrMobileWithInfo(
      prisma,
      emailOrMobile,
      emailOrMobile,
    );

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const isValidPassword = await verify(user.password, params.password);

    if (!isValidPassword) {
      return new UserInputError(INVALID_CREDENTIAL);
    }

    const pickUser = pick(user, [
      "id",
      "name",
      "mobile",
      "email",
      "role",
      "authorStatus",
      "about",
      "avatar",
    ]) as IUserPayload;

    const { accessToken, refreshToken } = await generateTokensService(pickUser);

    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, // https
      sameSite: "none", // cross-site cookie
      maxAge: ms(config.REFRESH_TOKEN_EXPIRES), // cookie expiry
    });
    return accessToken;
  } catch (error) {
    logger.error(error);
    return new UnknownError(AUTH_FAIL_ERR_MSG);
  }
}