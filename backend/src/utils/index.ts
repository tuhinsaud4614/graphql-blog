import { GraphQLError } from "graphql";

import { randomUUID } from "crypto";
import fs, { unlink } from "fs";
import imageSize from "image-size";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import _, { has, random } from "lodash";
import ms from "ms";
import path from "path";
import { promisify } from "util";
import { ValidationError } from "yup";

import logger from "../logger";
import { CustomError, UserInputError } from "../model";
import config from "./config";
import {
  BAD_USER_INPUT,
  FAILED_FILE_ERR_MSG,
  IMAGE_MIMES,
  INTERNAL_SERVER_ERROR,
  INVALID_FILE_ERR_MSG,
  NOT_IMG_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  generateRefreshTokenKeyName,
  generateTooLargeFileErrorMessage,
  generateValidationErrorMessage,
} from "./constants";
import {
  IExtensionsWithAuthorization,
  IUserPayload,
  IVerifyResetPassword,
} from "./interfaces";
import redisClient from "./redis";

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

export function getUserPayload(decoded: string | JwtPayload) {
  if (typeof decoded === "object" && "id" in decoded && "email" in decoded) {
    return {
      id: decoded["id"],
      name: decoded["name"],
      mobile: decoded["mobile"],
      email: decoded["email"],
      role: decoded["role"],
      authorStatus: decoded["authorStatus"],
      avatar: decoded["avatar"],
      about: decoded["about"],
    } as IUserPayload;
  }

  throw new CustomError(UN_AUTH_ERR_MSG, UN_AUTH_EXT_ERR_CODE);
}

export const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = verify(token, config.REFRESH_TOKEN_SECRET_KEY);
    const payload = getUserPayload(decoded);

    const value = await redisClient.get(
      generateRefreshTokenKeyName(payload.id),
    );
    if (value && token === JSON.parse(value)) {
      return payload;
    }
    redisClient.del(generateRefreshTokenKeyName(payload.id));
    throw new CustomError(UN_AUTH_ERR_MSG, UN_AUTH_EXT_ERR_CODE);
  } catch (error) {
    logger.error(error);
    throw new CustomError(UN_AUTH_ERR_MSG, UN_AUTH_EXT_ERR_CODE);
  }
};

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

export const isExtensionsWithAuthorization = (
  extensions: any,
): extensions is IExtensionsWithAuthorization =>
  typeof extensions === "object" &&
  "headers" in extensions &&
  typeof extensions.headers === "object" &&
  "Authorization" in extensions.headers;

export const verifyAccessTokenFromExtensions = (extensions: any) => {
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
  user: IUserPayload,
  key: string,
  expires: string,
  settable: boolean = false,
) => {
  const token = jwt.sign({ ...user }, key, {
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
export const maxFileSize = (mb: number) => mb * 1000000;

type FileFilterCallbackFunctionType = (
  error: CustomError | null,
  valid?: boolean,
) => void;

type FileFilterFunctionType = (
  file: File,
  cb: FileFilterCallbackFunctionType,
) => void;

const fileFilterCb = (error: CustomError | null, valid?: boolean) => {
  if (error !== null) {
    throw error;
  } else if (valid === false) {
    throw new CustomError(INVALID_FILE_ERR_MSG, BAD_USER_INPUT);
  }
};

export async function fileUpload(
  file: File,
  {
    filterFunction,
    dest,
    name,
  }: {
    dest?: string;
    name?: string;
    filterFunction?: FileFilterFunctionType;
  },
) {
  try {
    filterFunction && filterFunction(file, fileFilterCb);
    const newDest = dest || path.join(process.cwd(), "files");
    fs.mkdirSync(newDest, { recursive: true });

    const newName = name ? name + path.extname(file.name) : file.name;
    const filePath = path.join(newDest, newName);

    await fs.promises.writeFile(filePath, file.stream());

    return { ...file, name: newName, ext: path.extname(newName), filePath };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(FAILED_FILE_ERR_MSG, INTERNAL_SERVER_ERROR);
  }
}

export async function imageUpload(
  file: File,
  dest: string,
  name: string,
  maxSize: number = maxFileSize(5),
) {
  const { name: newName, filePath } = await fileUpload(file, {
    dest,
    name,
    filterFunction(newFile, cb) {
      const { type, size } = newFile;
      if (!has(IMAGE_MIMES, type)) {
        return cb(new CustomError(NOT_IMG_ERR_MSG, BAD_USER_INPUT));
      }

      if (size > maxSize) {
        return cb(
          new CustomError(
            generateTooLargeFileErrorMessage("Image", `${maxSize} Mb`),
            BAD_USER_INPUT,
          ),
        );
      }

      return cb(null, true);
    },
  });

  const dimensions = await AsyncImageSize(filePath);

  return {
    name: newName,
    width: dimensions?.width,
    height: dimensions?.height,
    filePath,
  } as const;
}

export function removeFile(filePath?: string) {
  if (!filePath) {
    return;
  }
  unlink(filePath, (linkErr) => {
    if (linkErr) {
      console.error(linkErr?.message);
    }
  });
}

export const isDev = () => process.env.NODE_ENV === "development";

export const isVerifyResetPassword = (
  data: any,
): data is IVerifyResetPassword =>
  typeof data === "object" && _.has(data, "code") && _.has(data, "hash");
