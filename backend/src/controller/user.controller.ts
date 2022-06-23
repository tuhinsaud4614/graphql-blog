import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { pick } from "lodash";
import * as yup from "yup";
import { createUser, getUserByEmail } from "../services/user.service";
import { formatYupError } from "../utils";
import { CREATION_ERR_MSG, EXIST_ERR_MSG } from "../utils/constants";
import { IRegisterUserInput } from "../utils/interfaces";
import { registerUserSchema } from "../validations/user.validation";

export async function registerUserCtrl(
  prisma: PrismaClient,
  args: IRegisterUserInput
) {
  try {
    const { email, password, mobile, role, name } = args;
    await registerUserSchema.validate(args, { abortEarly: false });
    const isUserExist = await getUserByEmail(prisma, email);

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

    return pick(user, ["email", "mobile", "role", "name"]);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      const err = formatYupError(error);
      return new GraphQLYogaError(err);
    }
    return new GraphQLYogaError(CREATION_ERR_MSG("User"));
  }
}
