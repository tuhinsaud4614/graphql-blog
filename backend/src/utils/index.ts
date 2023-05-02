import { GraphQLError } from "graphql";

import { randomUUID } from "crypto";
import fs, { unlink } from "fs";
import { imageSize } from "image-size";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { random } from "lodash";
import ms from "ms";
import path from "path";
import { promisify } from "util";
import { ValidationError } from "yup";

import logger from "../logger";
import { AuthenticationError, UserInputError } from "../model";
import config from "./config";
import {
  INTERNAL_SERVER_ERROR,
  UN_AUTH_ERR_MSG,
  generateRefreshTokenKeyName,
  generateValidationErrorMessage,
} from "./constants";
import redisClient from "./redis";
import { isExtensionsWithAuthorization } from "./type-guard";
import type { UserWithAvatar } from "./types";

// Sub exports
export { default as createContext } from "./context";

export const formatYupError = (err: ValidationError) => {
  const errors: { path?: string; message: string }[] = [];
  err.inner.forEach((e) => {
    errors.push({
      path: e.path,
      message: e.message,
    });
  });
  return errors;
};

export function formatError(
  error: unknown,
  options?: {
    /** If you want to set custom message. */
    message?: string;
    /** Indicate the field that failed validation. */
    key?: string;
    /** Code for error. */
    code?: string;
  },
) {
  if (error instanceof ValidationError) {
    return new UserInputError(generateValidationErrorMessage(options?.key), {
      fields: formatYupError(error),
    });
  }

  return new GraphQLError(options?.message || "Something went wrong.", {
    extensions: { code: options?.code || INTERNAL_SERVER_ERROR },
  });
}

export function nanoid(size?: number) {
  if (size && size <= 256) {
    const arr = Array.from({ length: size }, (_, i) => i * random(0, size));
    return arr.reduce(
      (t, e) =>
        (t +=
          (e &= 63) < 36
            ? e.toString(36)
            : e < 62
            ? (e - 26).toString(36).toUpperCase()
            : e > 62
            ? "-"
            : "_"),
      "",
    );
  }
  return randomUUID();
}

/**
 * The function extracts user payload information from a decoded JWT token.
 * @param {string | JwtPayload} decoded - The parameter `decoded` is of type `string | JwtPayload`,
 * which means it can either be a string or a decoded JSON Web Token (JWT) payload. The function checks
 * if the `decoded` parameter is an object that contains certain properties such as `id` and `email`,
 * and if
 * @returns an object of type `IUserPayload` which contains the decoded user information such as id,
 * name, mobile, email, role, authorStatus, avatar, and about. If the decoded parameter is not an
 * object with the required properties, the function throws an `AuthenticationError` with an error
 * message.
 */
export function getUserPayload(decoded: string | JwtPayload) {
  if (
    typeof decoded === "object" &&
    "id" in decoded &&
    "name" in decoded &&
    "email" in decoded &&
    "mobile" in decoded &&
    "role" in decoded &&
    "authorStatus" in decoded &&
    "avatar" in decoded &&
    "about" in decoded
  ) {
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      mobile: decoded.mobile,
      role: decoded.role,
      authorStatus: decoded.authorStatus,
      avatar: decoded.avatar,
      about: decoded.about,
    } as UserWithAvatar;
  }

  throw new AuthenticationError(UN_AUTH_ERR_MSG);
}

export const verifyAccessTokenInContext = (request: Request) => {
  try {
    const authToken = request.headers.get("Authorization");
    if (!authToken) {
      return null;
    }

    const token = authToken.replace(/^Bearer\s/, "");
    const decoded = verify(token, config.ACCESS_TOKEN_SECRET_KEY);
    return getUserPayload(decoded);
  } catch (error) {
    return null;
  }
};

/**
 * This function verifies an access token from extensions and returns the user payload if successful.
 * @param {any} extensions - The `extensions` parameter is an object that contains additional
 * information about the GraphQL request, such as headers, variables, and operation name. In this
 * function, it is used to extract the `Authorization` header, which contains the access token needed
 * to verify the user's identity.
 * @returns The function `verifyAccessTokenFromExtensions` returns either `null` or the decoded user
 * payload if the access token in the extensions object is valid.
 */
export const verifyAccessTokenFromExtensions = (extensions: unknown) => {
  try {
    if (!isExtensionsWithAuthorization(extensions)) {
      return null;
    }

    const authToken = extensions.headers.Authorization;

    if (!authToken) {
      return null;
    }

    const token = authToken.replace(/^Bearer\s/, "");
    const decoded = verify(token, config.ACCESS_TOKEN_SECRET_KEY);
    return getUserPayload(decoded);
  } catch (error) {
    return null;
  }
};

export const generateToken = async (
  user: UserWithAvatar,
  key: string,
  expires: string,
  settable = false,
) => {
  const token = sign({ ...user }, key, {
    expiresIn: expires,
  });

  const exp = isNaN(+expires) ? ms(expires) / 1000 : +expires;

  if (settable) {
    await redisClient.setex(
      generateRefreshTokenKeyName(user.id),
      exp,
      JSON.stringify(token),
    );
  }
  return token;
};

export const AsyncImageSize = promisify(imageSize);

/**
 * The function calculates the maximum file size in bytes based on the input in megabytes.
 * @param {number} mb - The parameter "mb" is a number representing the size of a file in megabytes.
 */
export const maxFileSize = (mb: number) => mb * 1000000;

export async function fileUpload(
  file: File,
  {
    dest,
    name,
  }: {
    dest?: string;
    name?: string;
  },
) {
  const newDest = dest || path.join(process.cwd(), "files");
  fs.mkdirSync(newDest, { recursive: true });

  const newName = name ? name + path.extname(file.name) : file.name;
  const filePath = path.join(newDest, newName);

  await fs.promises.writeFile(filePath, file.stream());
  return { ...file, name: newName, ext: path.extname(newName), filePath };
}

export async function imageUpload(file: File, dest: string, name: string) {
  const { name: newName, filePath } = await fileUpload(file, {
    dest,
    name,
  });
  const dimensions = await AsyncImageSize(filePath);

  return {
    name: newName,
    width: dimensions?.width,
    height: dimensions?.height,
    filePath,
  } as const;
}

/**
 * This function removes a file at a specified file path if it exists.
 * @param {string} [filePath] - The `filePath` parameter is a string that represents the path of the
 * file that needs to be removed. If the parameter is not provided or is falsy, the function returns
 * without doing anything. If the file exists, it will be deleted using the `unlink` function from the
 * Node.js `fs
 * @returns If `filePath` is not provided, `undefined` will be returned. If `unlink` encounters an
 * error, nothing will be returned.
 */
export function removeFile(filePath?: string) {
  if (!filePath) {
    return;
  }
  unlink(filePath, (linkErr) => {
    if (linkErr) {
      logger.error(linkErr?.message);
    }
  });
}
