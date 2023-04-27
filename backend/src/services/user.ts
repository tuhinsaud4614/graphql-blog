import { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import { Request, Response } from "express";
import { unlink } from "fs";
import { pick } from "lodash";
import ms from "ms";
import path from "path";

import logger from "@/logger";
import {
  AuthenticationError,
  ForbiddenError,
  NoContentError,
  UnknownError,
  UserInputError,
} from "@/model";
import {
  createOrUpdateAvatar,
  createUser,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithAvatar,
  getUserById,
  getUserByIdWithAvatar,
  resetNewPassword,
  updateAuthorStatusToVerified,
} from "@/repositories/user";
import { formatError, generateToken, imageUpload, nanoid } from "@/utils";
import config from "@/utils/config";
import {
  AUTH_FAIL_ERR_MSG,
  INVALID_CREDENTIAL,
  UN_AUTH_ERR_MSG,
  generateCreationErrorMessage,
  generateExistErrorMessage,
  generateNotExistErrorMessage,
  generateRefreshTokenKeyName,
  generateResetPasswordVerificationKeyForId,
  generateUserVerificationKey,
} from "@/utils/constants";
import { IUserPayload } from "@/utils/interfaces";
import redisClient from "@/utils/redis";
import { isVerifyResetPassword } from "@/utils/type-check";
import type {
  IDParams,
  ImageParams,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UserWithAvatar,
  VerifyCodeParams,
  VerifyUserParams
} from "@/utils/types";
import { idParamsSchema, imageParamsSchema } from "@/validations";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyCodeSchema,
  verifyUserSchema,
} from "@/validations/user";

import {
  sendResetPasswordVerificationCodeService,
  sendVerificationCodeService,
} from "./mail";

async function generateTokensService(user: UserWithAvatar) {
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

    if (isUserExist?.authorStatus === "VERIFIED") {
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

    if (authorStatus === "VERIFIED") {
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

    if (authorStatus === "VERIFIED") {
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

    const user = await getUserByEmailOrMobileWithAvatar(
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
    
    const { accessToken, refreshToken } = await generateTokensService(user);

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

/**
 * This is a function that logs out a user by deleting their refresh token and clearing
 * their JWT cookie.
 * @param {IUserPayload} user - The user parameter is an object that represents the user payload, which
 * contains information about the user such as their ID, name, email, etc.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information about the request such as the URL, headers, and any data sent in the
 * request body.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object from the
 * Express.js framework. It is used to send a response back to the client after processing a request.
 * In this case, it is used to clear the JWT cookie and send a success or error response.
 * @returns either the user ID if the logout is successful, or an error object (either a NoContentError
 * or an AuthenticationError) if there is an issue with the logout process.
 */
export async function logoutService(
  user: IUserPayload,
  req: Request,
  res: Response,
) {
  try {
    const jwt = req.cookies?.jwt;
    if (!jwt) {
      return new NoContentError("Logout failed.");
    }

    await redisClient.del(generateRefreshTokenKeyName(user.id));

    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });

    return user.id;
  } catch (error) {
    logger.error(error);
    return new UnknownError("Logout failed.");
  }
}

/**
 * This is a function that resets a user's password by validating input, verifying old
 * password, hashing new password, and sending a reset password verification code to the user's email.
 * @param {PrismaClient} prisma - An instance of the PrismaClient used to interact with the database.
 * @param {string} userId - The ID of the user whose password needs to be reset.
 * @param {ResetPasswordInput} params - The `params` parameter is an object that contains the
 * `newPassword` and `oldPassword` fields, which are used to reset the user's password.
 * @param {string} [host] - The `host` parameter is an optional string that represents the host URL
 * where the reset password verification code will be sent to. It is used in the
 * `sendResetPasswordVerificationCodeService` function. If it is not provided, the default host URL
 * will be used.
 * @returns a string message indicating that a reset password code has been sent to the user's email
 * address for verification. If there is an error, it returns an error object with a message indicating
 * the reason for the error.
 */
export async function resetPasswordService(
  prisma: PrismaClient,
  userId: string,
  params: ResetPasswordInput,
  host?: string,
) {
  try {
    await resetPasswordSchema.validate(params, { abortEarly: false });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "reset password" });
  }

  try {
    const user = await getUserById(prisma, userId);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const { newPassword, oldPassword } = params;

    if (!(await verify(user.password, oldPassword))) {
      return new UserInputError("Invalid credentials");
    }

    const hashNewPassword = await hash(newPassword);

    await sendResetPasswordVerificationCodeService(
      userId,
      user.email,
      hashNewPassword,
      host,
    );

    return `Reset password code sent to ${user.email}. Check the email.`;
  } catch (error) {
    logger.error(error);
    return new UnknownError("Failed to reset password.");
  }
}

/**
 * This function verifies a reset password code and resets the user's password if the code is valid.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for TypeScript and Node.js that can be used to interact with a database.
 * @param {string} userId - The ID of the user whose password is being reset.
 * @param {VerifyCodeParams} params - The `params` parameter is an object containing the `code`
 * property, which is a string representing the verification code entered by the user during the reset
 * password process.
 * @returns The function can return different values depending on the execution path:
 * - If the `params` object fails validation against the `verifyCodeSchema`, an error object with
 * details about the validation errors is returned.
 * - If the `userId` parameter does not correspond to an existing user in the database, a
 * `ForbiddenError` object with a message indicating that the user does not exist is returned.
 * - If the
 */
export async function verifyResetPasswordService(
  prisma: PrismaClient,
  userId: string,
  params: VerifyCodeParams,
) {
  try {
    await verifyCodeSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "verify reset password code" });
  }

  try {
    const user = await getUserById(prisma, userId);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const key = generateResetPasswordVerificationKeyForId(userId);
    const { code } = params;

    const data = await redisClient.get(key);
    const result = data ? JSON.parse(data) : null;

    if (!isVerifyResetPassword(result) || result.code !== code) {
      return new ForbiddenError("Reset password verification failed");
    }
    await redisClient.del(key);

    await resetNewPassword(prisma, userId, result.hash);

    return "Reset password successfully.";
  } catch (error) {
    logger.error(error);
    return new UnknownError("Reset password verification failed");
  }
}

export async function uploadAvatarService(
  prisma: PrismaClient,
  userId: string,
  params: ImageParams,
) {
  try {
    await imageParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "upload avatar" });
  }

  try {
    const detailedUser = await getUserByIdWithAvatar(prisma, userId);

    if (!detailedUser) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");
    
    const image = await imageUpload(params.image, dest, uId);

    const updatedUser = await createOrUpdateAvatar(prisma, userId, image);

    if (updatedUser.avatar && detailedUser.avatar) {
      const oldAvatarPath = `${process.cwd()}/${detailedUser.avatar.url}`;
      unlink(oldAvatarPath, (linkErr) => {
        if (linkErr) {
          logger.error(linkErr);
        }
      });
    }

    return pick(updatedUser.avatar, ["id", "url", "height", "width"]);
  } catch (error) {
    logger.error(error);
    return new UnknownError(
      "Avatar upload failed."
    );
  }
}
