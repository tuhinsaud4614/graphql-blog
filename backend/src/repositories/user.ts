import { Prisma, PrismaClient } from "@prisma/client";

import { EAuthorStatus, EUserRole } from "@/utils/enums";
import type { RegisterInput } from "@/utils/types";

const infoIncludes: Prisma.UserInclude = {
  avatar: { select: { id: true, height: true, width: true, url: true } },
  followers: {
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      avatar: { select: { id: true, height: true, width: true, url: true } },
    },
  },
  followings: {
    select: {
      id: true,
      name: true,
      email: true,
      mobile: true,
      avatar: { select: { id: true, height: true, width: true, url: true } },
    },
  },
};

/**
 * This function creates a new user with the given input data and sets their role and author status.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param  - The `createUser` function takes in two parameters:
 * @returns The `createUser` function is returning a Promise that resolves to a newly created user
 * object in the database. The user object contains the properties `email`, `mobile`, `password`,
 * `name`, `role`, and `authorStatus`.
 */
export function createUser(
  prisma: PrismaClient,
  { email, mobile, password, name }: Omit<RegisterInput, "confirmPassword">,
) {
  return prisma.user.create({
    data: {
      email,
      mobile,
      password,
      name,
      role: EUserRole.Author,
      authorStatus: EAuthorStatus.Pending,
    },
  });
}

/**
 * This function updates the author status of a user to "Verified" in a Prisma database.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} id - The id parameter is a string that represents the unique identifier of a user in
 * the database. It is used to locate the user whose author status needs to be updated to "Verified".
 * @returns The `updateAuthorStatusToVerified` function is returning a Promise that resolves to the
 * updated user object with the `authorStatus` property set to `EAuthorStatus.Verified`.
 */
export function updateAuthorStatusToVerified(prisma: PrismaClient, id: string) {
  return prisma.user.update({
    data: { authorStatus: EAuthorStatus.Verified },
    where: { id },
  });
}

/**
 * This TypeScript function returns a user object from a Prisma client based on their email or mobile
 * number.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} email - The email parameter is a string that represents the email address of a user.
 * @param {string} mobile - The `mobile` parameter is a string that represents a user's mobile phone
 * number. It is used as one of the criteria to search for a user in the database along with their
 * email address.
 * @returns a Promise that resolves to a user object from the PrismaClient database that matches either
 * the email or mobile number provided as arguments.
 */
export async function getUserByEmailOrMobile(
  prisma: PrismaClient,
  email: string,
  mobile: string,
) {
  return await prisma.user.findFirst({
    where: { OR: [{ email }, { mobile }] },
  });
}

/**
 * This TypeScript function finds a user in a Prisma database by their email or mobile number and
 * includes additional information.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} email - The email parameter is a string that represents the email address of a user.
 * It is used as a filter criterion to search for a user in the database.
 * @param {string} mobile - The `mobile` parameter is a string that represents the user's mobile phone
 * number. It is used as a search criteria along with the `email` parameter to find a user in the
 * database.
 * @returns a Promise that resolves to a user object from the Prisma client database that matches
 * either the email or mobile number provided as arguments, and includes additional information
 * specified in the `infoIncludes` variable.
 */
export async function getUserByEmailOrMobileWithInfo(
  prisma: PrismaClient,
  email: string,
  mobile: string,
) {
  return prisma.user.findFirst({
    where: { OR: [{ email }, { mobile }] },
    include: infoIncludes,
  });
}

/**
 * This function retrieves a user from a Prisma client by their ID.
 * @param {PrismaClient} prisma - The PrismaClient instance that is used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used as a filter to find a specific user in the database using the `findUnique` method of the
 * Prisma client.
 * @returns The function `getUserById` is returning a Promise that resolves to a single user object
 * from the Prisma database, based on the provided `id`.
 */
export function getUserById(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({ where: { id } });
}
