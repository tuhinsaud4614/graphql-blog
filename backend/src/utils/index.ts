import { GraphQLYogaError } from "@graphql-yoga/node";
import { randomBytes, randomUUID } from "crypto";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { ValidationError } from "yup";
import { REFRESH_TOKEN_KEY_NAME, UN_AUTHORIZED_ERR_MSG } from "./constants";
import { IUserPayload } from "./interfaces";
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
  return JSON.stringify(errors);
};

export function nanoid(size: number) {
  if (size && size <= 256) {
    return randomBytes(size).toString("base64");
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
      slug: decoded["slug"],
      avatar: decoded["avatar"],
      about: decoded["about"],
    } as IUserPayload;
  }

  throw new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
}

export const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = verify(token, process.env.REFRESH_TOKEN_SECRET_KEY!);
    getUserPayload(decoded);
  } catch (error) {
    console.log(error);
    throw new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
  }
};

export const verifyAccessToken = async (req: Request) => {
  try {
    const authToken = req.headers.get("Authorization");
    if (!authToken) {
      throw new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
    }

    const token = authToken.replace(/^Bearer\s/, "");
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);
    getUserPayload(decoded);
  } catch (error) {
    console.log(error);
    throw new GraphQLYogaError(UN_AUTHORIZED_ERR_MSG);
  }
};

export const generateToken = async (
  user: IUserPayload,
  key: string,
  expires: string,
  settable: boolean = false
) => {
  const token = jwt.sign({ ...user }, key, {
    expiresIn: expires,
  });

  if (settable) {
    await redisClient.set(
      REFRESH_TOKEN_KEY_NAME(user.id),
      JSON.stringify(token)
    );
  }
  return token;
};
