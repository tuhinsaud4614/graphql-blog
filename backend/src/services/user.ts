import { Prisma, PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";
import type { Request, Response } from "express";
import { unlink } from "fs";
import { verify as jwtVerify } from "jsonwebtoken";
import { pick } from "lodash";
import ms from "ms";
import path from "path";

import logger from "@/logger";
import {
  AuthenticationError,
  ForbiddenError,
  UnknownError,
  UserInputError,
} from "@/model";
import { getAllPosts } from "@/repositories/post";
import {
  createOrUpdateAvatar,
  createUser,
  followTo,
  getUserAvatar,
  getUserByEmailOrMobile,
  getUserByEmailOrMobileWithAvatar,
  getUserById,
  getUserByIdWithAvatar,
  getUserFollowBy,
  getUserFollowByCount,
  getUserFollowCount,
  getUserFollowers,
  getUserFollowersCount,
  getUsersWithCursor,
  getUsersWithOffset,
  isFollower,
  resetNewPassword,
  unfollowTo,
  updateAuthorStatusToVerified,
  updateUserAbout,
  updateUserName,
} from "@/repositories/user";
import {
  formatError,
  generateToken,
  getUserPayload,
  imageUpload,
  nanoid,
} from "@/utils";
import config from "@/utils/config";
import {
  AUTH_FAIL_ERR_MSG,
  FOLLOW_ERR_MSG,
  INVALID_CREDENTIAL,
  UN_AUTH_ERR_MSG,
  generateCreationErrorMessage,
  generateEntityNotExistErrorMessage,
  generateExistErrorMessage,
  generateFetchErrorMessage,
  generateNotExistErrorMessage,
  generateRefreshTokenKeyName,
  generateResetPasswordVerificationKeyForId,
  generateUserVerificationKey,
} from "@/utils/constants";
import { IUserPayload } from "@/utils/interfaces";
import redisClient from "@/utils/redis";
import { isVerifyResetPassword } from "@/utils/type-guard";
import type {
  AuthorIdWithCursorParams,
  IDParams,
  ImageParams,
  LoginInput,
  OffsetParams,
  RegisterInput,
  ResetPasswordInput,
  UpdateAboutParams,
  UpdateNameParams,
  UserWithAvatar,
  VerifyCodeParams,
  VerifyUserParams,
} from "@/utils/types";
import {
  idParamsSchema,
  imageParamsSchema,
  offsetParamsSchema,
} from "@/validations";
import {
  authorIdWithCursorSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateAboutSchema,
  updateNameSchema,
  verifyCodeSchema,
  verifyUserSchema,
} from "@/validations/user";

import {
  sendResetPasswordVerificationCodeService,
  sendVerificationCodeService,
} from "./mail";

/**
 * This function generates access and refresh tokens for a given user.
 * @param {UserWithAvatar} user - The `user` parameter is an object of type `UserWithAvatar`. It is
 * likely that this object contains information about a user, such as their username, email, and
 * possibly a profile picture. This object is used to generate access and refresh tokens for the user.
 * @returns The function `generateTokensService` returns an object with two properties: `accessToken`
 * and `refreshToken`. These tokens are generated using the `generateToken` function with the provided
 * `user` object, secret keys, and expiration times. The `refreshToken` is generated with an additional
 * parameter `true` to indicate that it is a refresh token. The `as const` assertion is used to
 */
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
 * This function verifies a refresh token by decoding it, checking if it matches the one stored in
 * Redis, and returning the user payload if it is valid.
 * @param {string} token - The `token` parameter is a string representing a refresh token that needs to
 * be verified.
 * @returns The function `verifyRefreshToken` returns a Promise that resolves to the `payload` object
 * if the refresh token is valid and matches the one stored in Redis, or throws an
 * `AuthenticationError` with the message `UN_AUTH_ERR_MSG` if the token is invalid or has expired.
 */
const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = jwtVerify(token, config.REFRESH_TOKEN_SECRET_KEY);
    const payload = getUserPayload(decoded);

    const value = await redisClient.get(
      generateRefreshTokenKeyName(payload.id),
    );
    if (value && token === JSON.parse(value)) {
      return payload;
    }
    redisClient.del(generateRefreshTokenKeyName(payload.id));
    throw new AuthenticationError(UN_AUTH_ERR_MSG);
  } catch (error) {
    logger.error(error);
    throw new AuthenticationError(UN_AUTH_ERR_MSG);
  }
};

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
    const { email, password, mobile, name, verificationLink } = params;
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

    await sendVerificationCodeService(user.id, email, verificationLink, host);

    return user.id;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateCreationErrorMessage("User"));
  }
}

/**
 * This function resend an activation code to a user's email if they have not yet been verified.
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
    return { accessToken, refreshToken };
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
 * @returns either the user ID if the logout is successful, or an error object (either a ForbiddenError
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
      return new ForbiddenError("Logout failed.");
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

    const { newPassword, oldPassword, verificationLink } = params;

    if (!(await verify(user.password, oldPassword))) {
      return new UserInputError("Invalid credentials");
    }

    const hashNewPassword = await hash(newPassword);

    await sendResetPasswordVerificationCodeService(
      userId,
      user.email,
      hashNewPassword,
      verificationLink,
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

/**
 * This function uploads a user's avatar image and updates their avatar information in the database.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} userId - The ID of the user for whom the avatar is being uploaded.
 * @param {ImageParams} params - The `params` parameter is an object containing the image file to be
 * uploaded, with the following properties:
 * @returns either a formatted error object or an object containing the updated user's avatar
 * information (id, url, height, width).
 */
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
      return new ForbiddenError(generateNotExistErrorMessage("User"));
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
    return new UnknownError("Avatar upload failed.");
  }
}

/**
 * This function updates a user's name in a database using input validation and error handling.
 * @param {PrismaClient} prisma - An instance of the PrismaClient, which is a type-safe database client
 * for Node.js that provides autocompletion and type checking for database queries.
 * @param {string} userId - The ID of the user whose name is being updated.
 * @param {UpdateNameParams} params - The `params` parameter is an object that contains the new name
 * that the user wants to update to. It should have the following properties:
 * @returns either an error object or the result of calling the `updateUserName` function with the
 * provided `prisma` client, the `id` of the user retrieved by calling `getUserByIdWithAvatar`, and the
 * `name` property of the `params` object.
 */
export async function updateNameService(
  prisma: PrismaClient,
  userId: string,
  params: UpdateNameParams,
) {
  try {
    await updateNameSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "update name" });
  }

  try {
    const user = await getUserByIdWithAvatar(prisma, userId);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const updatedUser = await updateUserName(prisma, user.id, params.name);
    return updatedUser.name;
  } catch (error) {
    logger.error(error);
    return new UnknownError("User name update failed.");
  }
}

/**
 * Updates a user's about section.
 * @param {PrismaClient} prisma - An instance of PrismaClient.
 * @param {string} userId - The ID of the user to update.
 * @param {UpdateAboutParams} params - An object containing the new about value to update.
 * @returns {Promise<User | ForbiddenError | UnknownError>} - A Promise that resolves with the updated user object, or one of the following error objects: ForbiddenError, UnknownError.
 */
export async function updateAboutService(
  prisma: PrismaClient,
  userId: string,
  params: UpdateAboutParams,
) {
  try {
    await updateAboutSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "update about" });
  }

  try {
    const user = await getUserByIdWithAvatar(prisma, userId);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    return await updateUserAbout(prisma, user.id, params.value);
  } catch (error) {
    logger.error(error);
    return new UnknownError("User about update failed.");
  }
}

/**
 * This function follows a user and returns the followed user's information.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} toId - The `toId` parameter is a string representing the ID of the user that the
 * current user wants to follow.
 * @param {string} ownId - The `ownId` parameter is a string representing the ID of the user who is
 * initiating the follow request.
 * @returns either the followed user object or an error object. If the user with the given ID does not
 * exist, a ForbiddenError object with an error message is returned. If there is any other error, an
 * UnknownError object with a default error message is returned.
 */
export async function followRequestService(
  prisma: PrismaClient,
  toId: string,
  ownId: string,
) {
  try {
    const user = await getUserByIdWithAvatar(prisma, toId);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    const followedUser = await followTo(prisma, toId, ownId);
    return followedUser;
  } catch (error) {
    logger.error(error);
    return new UnknownError(FOLLOW_ERR_MSG);
  }
}

/**
 * This function handles an unfollow request by checking if the user exists and unfollowing them if
 * they do.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} toId - The ID of the user that the current user wants to unfollow.
 * @param {string} ownId - The `ownId` parameter is a string representing the ID of the user who wants
 * to unfollow another user.
 * @returns either the ID of the user that was unfollowed or an error object if an error occurred
 * during the process.
 */
export async function unfollowRequestService(
  prisma: PrismaClient,
  toId: string,
  ownId: string,
) {
  try {
    const user = await getUserByIdWithAvatar(prisma, toId);

    if (!user) {
      return new ForbiddenError(generateNotExistErrorMessage("User"));
    }

    await unfollowTo(prisma, toId, ownId);
    return toId;
  } catch (error) {
    logger.error(error);
    return new UnknownError(FOLLOW_ERR_MSG);
  }
}

/**
 * This function generates an access token using a refresh token and returns an authentication error if
 * the refresh token is invalid or the user does not exist.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} [refreshToken] - The refresh token is a string that is used to obtain a new access
 * token after the previous one has expired. It is typically sent by the client to the server in a
 * request to refresh the access token.
 * @returns either an access token or an AuthenticationError object. If there is no refresh token
 * provided or the user associated with the refresh token does not exist, an AuthenticationError object
 * with an unauthorized error message is returned. If the user exists, an access token generated using
 * the user's information and the access token secret key and expiration time is returned.
 */
export async function tokenService(
  prisma: PrismaClient,
  refreshToken?: string,
) {
  try {
    if (!refreshToken) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    const user = await verifyRefreshToken(refreshToken);
    const isExist = await getUserByIdWithAvatar(prisma, user.id);

    if (!isExist) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    const accessToken = await generateToken(
      isExist,
      config.ACCESS_TOKEN_SECRET_KEY,
      config.ACCESS_TOKEN_EXPIRES,
    );

    return accessToken;
  } catch (error) {
    logger.error(error);
    return new AuthenticationError(UN_AUTH_ERR_MSG);
  }
}

/**
 * This is a function that retrieves a list of users with pagination and filtering options,
 * excluding the admin user and the current user.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {OffsetParams} params - The `params` parameter is an object that contains the `limit` and
 * `page` properties, which are used to determine the number of results to return and which page of
 * results to return, respectively. It also has an optional `userId` property, which is used to exclude
 * a specific user from
 * @param {string} userId - The `userId` parameter is a string that represents the ID of a
 * user. It is used in the `condition` object to exclude the user with this ID from the query results.
 * @returns either an error object or an object containing an array of user data and the total count of
 * users that match the specified conditions. If there are no users that match the conditions, an
 * object with an empty array and a total count of 0 is returned.
 */
export async function usersWithOffsetService(
  prisma: PrismaClient,
  params: OffsetParams,
  userId: string,
) {
  try {
    await offsetParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "users" });
  }

  try {
    const { limit, page } = params;
    const condition = {
      where: {
        role: { not: "ADMIN" },
        id: { not: userId },
      } as Prisma.UserWhereInput,
    };

    const count = await prisma.user.count(condition);
    if (count === 0) {
      return { data: [], total: count };
    }

    return await getUsersWithOffset(prisma, count, page, limit, {
      orderBy: { updatedAt: "desc" },
      ...condition,
    });
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("users"));
  }
}

/**
 * This function suggests authors with an offset based on given parameters and user ID.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {OffsetParams} params - The `params` parameter is an object containing the pagination
 * parameters `limit` and `page`. These parameters are used to limit the number of results returned and
 * to specify which page of results to return.
 * @param {string} userId - The `userId` parameter is a string representing the unique identifier of a
 * user. It is used in the function to filter out users who are already being followed by the current
 * user and to exclude the current user from the list of suggested authors.
 * @returns either an error object or an object containing an array of suggested authors and the total
 * count of suggested authors. The suggested authors are retrieved from the database using the provided
 * PrismaClient instance and the given offset parameters and user ID. The function filters out authors
 * who are already followed by the user and have the role of "ADMIN". If there are no suggested
 * authors, an empty array is returned
 */
export async function suggestAuthorsWithOffsetService(
  prisma: PrismaClient,
  params: OffsetParams,
  userId: string,
) {
  try {
    await offsetParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "suggest authors" });
  }

  try {
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

    const count = await prisma.user.count(condition);
    if (count === 0) {
      return { data: [], total: count };
    }

    return await getUsersWithOffset(prisma, count, page, limit, {
      orderBy: { updatedAt: "desc" },
      ...condition,
    });
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("users"));
  }
}

/**
 * This function retrieves a list of users who follow a specific author, ordered by their update time,
 * with pagination support.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {AuthorIdWithCursorParams} params - The `params` parameter is an object that contains
 * the following properties:
 * @returns a Promise that resolves to an object containing a list of users who follow a specific
 * author, along with a cursor for pagination, or an error if one occurs.
 */
export async function authorFollowersWithCursorService(
  prisma: PrismaClient,
  params: AuthorIdWithCursorParams,
) {
  try {
    await authorIdWithCursorSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "author followers" });
  }

  try {
    const condition = {
      where: {
        followings: { some: { id: params.authorId } },
        role: { not: "ADMIN" },
        id: { not: params.authorId },
      } as Prisma.UserWhereInput,
    };

    const args: Prisma.UserFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.user.count(condition);
    return await getUsersWithCursor(prisma, params, args, count);
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("authors followers"));
  }
}

/**
 * This function retrieves a list of users who are following a specific author, ordered by
 * their update time, using pagination.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {AuthorIdWithCursorParams} params - The `params` parameter is an object that contains the
 * `authorId` and `cursor` properties. It is of type `AuthorIdWithCursorParams`.
 * @returns the result of calling the `getUsersWithCursor` function with the provided `prisma` client,
 * `params` object, `args` object, and `count` value. The `getUsersWithCursor` function likely returns
 * a list of user objects with pagination information based on the provided arguments. If there is an
 * error during validation or fetching the data, the function returns an
 */
export async function authorFollowingsWithCursorService(
  prisma: PrismaClient,
  params: AuthorIdWithCursorParams,
) {
  try {
    await authorIdWithCursorSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "author following" });
  }

  try {
    const condition = {
      where: {
        followers: { some: { id: params.authorId } },
        role: { not: "ADMIN" },
        id: { not: params.authorId },
      } as Prisma.UserWhereInput,
    };

    const args: Prisma.UserFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.user.count(condition);
    const result = await getUsersWithCursor(prisma, params, args, count);
    return result;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("authors following"));
  }
}

/**
 * This function retrieves a user by their ID using Prisma and returns an error if the user does not
 * exist or if there is an unknown error.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that is used to
 * interact with the database. It is passed as a parameter to the userService function.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used to retrieve the user from the database using the `getUserById` function.
 * @returns The `userService` function is returning either a `user` object if it exists in the
 * database, or a `ForbiddenError` with a message indicating that the user does not exist. If an error
 * occurs during the database query, the function returns an `UnknownError` with a message indicating
 * that the user could not be fetched.
 */
export async function userService(prisma: PrismaClient, id: string) {
  try {
    const user = await getUserById(prisma, id);
    return user ?? new ForbiddenError(generateNotExistErrorMessage("User"));
  } catch (error) {
    return new UnknownError(generateFetchErrorMessage("User"));
  }
}

/**
 * This is an async function that retrieves the follower count and whether a user is being followed by
 * another user using PrismaClient.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} forUserId - The ID of the user for whom the result is being fetched.
 * @param {string} [userId] - The `userId` parameter is an optional string that represents the ID of a
 * user. If it is provided, the function will check if the user with that ID is following the user with
 * the `forUserId` ID and return the follower count and a boolean indicating whether the user is
 * following or not.
 * @returns an object with two properties: `followerCount` and `hasFollow`. The values of these
 * properties depend on the input parameters and the results of two database queries. If `userId` is
 * provided, the function will return the count of followers for the user with ID `forUserId` and a
 * boolean indicating whether the user with ID `userId` is following `forUserId`. If `
 */
export async function userResultService(
  prisma: PrismaClient,
  forUserId: string,
  userId?: string,
) {
  try {
    if (userId) {
      const [followerCount, hasFollow] = await prisma.$transaction([
        getUserFollowersCount(prisma, forUserId),
        isFollower(prisma, userId, forUserId),
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
    return new UnknownError(generateFetchErrorMessage("user result"));
  }
}

/**
 * This TypeScript function returns the follower and following counts for a given user using a Prisma
 * client.
 * @param {PrismaClient} prisma - PrismaClient instance used to interact with the database.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used as input to retrieve the follower and following counts for that user.
 * @returns an object with two properties: `followerCount` and `followingCount`. The values of these
 * properties are obtained by calling the `getUserFollowCount` function with the `prisma` client and
 * `userId` as arguments. If the counts are successfully obtained, they are returned as the values of
 * the respective properties. If there is an error, the function returns an instance of the
 */
export async function userFollowService(prisma: PrismaClient, userId: string) {
  try {
    const counts = await getUserFollowCount(prisma, userId);

    return {
      followerCount: counts?._count.followers ?? 0,
      followingCount: counts?._count.followings ?? 0,
    };
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("user follow"));
  }
}

/**
 * This function returns the number of followers for a given user ID using the Prisma ORM.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user in the database. It is used to retrieve the number of followers for that particular user.
 * @returns The `userFollowersCountService` function returns the number of followers for a given user
 * ID. If there is an error, it returns an instance of the `UnknownError` class with a message
 * indicating that there was an error fetching the user's followers.
 */
export async function userFollowersCountService(
  prisma: PrismaClient,
  userId: string,
) {
  try {
    const followerCount = await getUserFollowersCount(prisma, userId);

    return followerCount?._count.followers ?? 0;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("user followers"));
  }
}

/**
 * This function returns the number of users following a given user by counting the
 * followings.
 * @param {PrismaClient} prisma - The Prisma client is an instance of the Prisma ORM that allows us to
 * interact with the database. It provides a type-safe API for querying the database and generating SQL
 * queries.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user in the database. It is used to retrieve the number of followings for that user.
 * @returns the count of users who are following the user with the given `userId`. If the count is not
 * available, it returns 0. If there is an error, it returns an instance of `UnknownError` with a
 * message indicating that there was an error fetching the user's followings.
 */
export async function userFollowByCountService(
  prisma: PrismaClient,
  userId: string,
) {
  try {
    const followerCount = await getUserFollowByCount(prisma, userId);

    return followerCount?._count.followings ?? 0;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateFetchErrorMessage("user followings"));
  }
}

/**
 * This is an async function that returns a user's avatar using their ID and a Prisma client, and
 * handles errors if the avatar does not exist.
 * @param {PrismaClient} prisma - PrismaClient instance used to interact with the database.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used as an input to retrieve the user's avatar from the database.
 * @returns The `userAvatarService` function is returning the result of calling the `getUserAvatar`
 * function with the provided `prisma` and `userId` parameters. If an error is thrown during the
 * execution of `getUserAvatar`, the function returns a new `UnknownError` object with a message
 * generated by the `generateEntityNotExistErrorMessage` function.
 */
export async function userAvatarService(prisma: PrismaClient, userId: string) {
  try {
    return await getUserAvatar(prisma, userId);
  } catch (error) {
    return new UnknownError(
      generateEntityNotExistErrorMessage("Avatar", "user"),
    );
  }
}

/**
 * This function retrieves all posts written by a specific user using their ID.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows the code
 * to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used to filter the posts and retrieve only the posts that were authored by the user with the
 * specified `id`.
 * @returns The `userPostsService` function is returning the result of calling the `getAllPosts`
 * function with a `PrismaClient` instance and an object containing a `where` property with a filter
 * object that specifies to retrieve all posts where the `authorId` matches the `id` parameter. If an
 * error is caught, it returns a new `UnknownError` instance with a message generated by the
 */
export async function userPostsService(prisma: PrismaClient, id: string) {
  try {
    return await getAllPosts(prisma, { where: { authorId: id } });
  } catch (error) {
    return new UnknownError(
      generateEntityNotExistErrorMessage("Avatar", "user"),
    );
  }
}

/**
 * This function retrieves a user's followers using PrismaClient and returns an error message if the
 * user does not exist.
 * @param {PrismaClient} prisma - PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used as an input to the `getUserFollowBy` function to retrieve the list of users who are
 * following the user with the given `id`.
 * @returns The `userFollowByService` function is returning the result of calling the `getUserFollowBy`
 * function with the `prisma` and `id` parameters. If `getUserFollowBy` function throws an error, the
 * `userFollowByService` function catches it and returns a new `UnknownError` object with a generated
 * error message.
 */
export async function userFollowByService(prisma: PrismaClient, id: string) {
  try {
    return await getUserFollowBy(prisma, id);
  } catch (error) {
    return new UnknownError(
      generateEntityNotExistErrorMessage("Follow by", "user"),
    );
  }
}

/**
 * This is an async function that returns a user's followers using Prisma, and if there's an error, it
 * returns an UnknownError with a message indicating that the entity (Followers) does not exist for the
 * user.
 * @param {PrismaClient} prisma - PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used as an input to retrieve the followers of the user from the database.
 * @returns The `userFollowersService` function is returning the result of calling the
 * `getUserFollowers` function with the provided `prisma` and `id` parameters wrapped in a try-catch
 * block. If the `getUserFollowers` function call is successful, the result is returned. If an error is
 * thrown, a new `UnknownError` object is returned with a message generated by the `
 */
export async function userFollowersService(prisma: PrismaClient, id: string) {
  try {
    return await getUserFollowers(prisma, id);
  } catch (error) {
    return new UnknownError(
      generateEntityNotExistErrorMessage("Followers", "user"),
    );
  }
}
