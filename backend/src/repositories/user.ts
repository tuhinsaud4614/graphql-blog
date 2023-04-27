import { PrismaClient } from "@prisma/client";

import { imageUpload } from "@/utils";
import type { RegisterInput } from "@/utils/types";

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
      role: "AUTHOR",
      authorStatus: "PENDING",
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
 * updated user object with the `authorStatus` property set to `"VERIFIED"`.
 */
export function updateAuthorStatusToVerified(prisma: PrismaClient, id: string) {
  return prisma.user.update({
    data: { authorStatus: "VERIFIED" },
    where: { id },
  });
}

/**
 * This function updates the password of a user in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * the user whose password needs to be reset.
 * @param {string} newPassword - The new password that the user wants to set for their account.
 * @returns a Promise that resolves to the updated user object with the new password.
 */
export function resetNewPassword(
  prisma: PrismaClient,
  userId: string,
  newPassword: string,
) {
  return prisma.user.update({
    data: { password: newPassword },
    where: { id: userId },
  });
}

/**
 * This function creates or updates a user's avatar in a Prisma database.
 * @param {PrismaClient} prisma - The Prisma client used to interact with the database.
 * @param {string} userId - The ID of the user whose avatar is being created or updated.
 * @param  - - `prisma`: an instance of the PrismaClient used to interact with the database
 * @returns a Promise that resolves to an updated user object with the avatar property included.
 */
export function createOrUpdateAvatar(
  prisma: PrismaClient,
  userId: string,
  { height, name, width }: Awaited<ReturnType<typeof imageUpload>>,
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      avatar: {
        upsert: {
          create: {
            url: `images/${name}`,
            width: width || 200,
            height: height || 200,
          },
          update: {
            url: `images/${name}`,
            width: width || 200,
            height: height || 200,
          },
        },
      },
    },
    include: { avatar: true },
  });
}

/**
 * This function updates the name of a user in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * user whose name needs to be updated.
 * @param {string} name - The new name that we want to update for the user.
 * @returns The `updateUserName` function is returning a Promise that resolves to the updated user
 * object with the new `name` value.
 */
export function updateUserName(prisma: PrismaClient, id: string, name: string) {
  return prisma.user.update({
    where: { id },
    data: {
      name,
    },
  });
}

/**
 * This function updates a user's "about" field in a Prisma database.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * user whose `about` field needs to be updated.
 * @param {string} value - The `value` parameter is a string that represents the new value for the
 * `about` field of a user in a database. This function updates the `about` field of a user with the
 * specified `id` to the new `value`.
 * @returns The `updateUserAbout` function is returning a Promise that resolves to the updated user
 * object with the new `about` value.
 */
export function updateUserAbout(
  prisma: PrismaClient,
  id: string,
  value: string,
) {
  return prisma.user.update({
    where: { id },
    data: {
      about: value,
    },
  });
}

export function followTo(prisma: PrismaClient, toId: string, ownId: string) {
  return prisma.user.update({
    where: { id: toId },
    data: { followers: { connect: { id: ownId } } },
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
 * This TypeScript function returns a user with their avatar based on their email or mobile number
 * using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with a database.
 * @param {string} email - The email parameter is a string that represents the email address of a user.
 * @param {string} mobile - The `mobile` parameter is a string that represents the user's mobile phone
 * number. It is used as one of the criteria to search for a user in the database along with their
 * email address.
 * @returns The function `getUserByEmailOrMobileWithAvatar` is returning a Promise that resolves to the
 * result of a Prisma query. The query searches for a user in the database whose email or mobile
 * matches the provided parameters, and includes the user's avatar data.
 */
export async function getUserByEmailOrMobileWithAvatar(
  prisma: PrismaClient,
  email: string,
  mobile: string,
) {
  return prisma.user.findFirst({
    where: { OR: [{ email }, { mobile }] },
    include: {
      avatar: { select: { id: true, height: true, width: true, url: true } },
    },
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

/**
 * This function retrieves a user by their ID with their associated avatar using Prisma.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows us to
 * interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used to find a specific user in the database.
 * @returns a Promise that resolves to a user object with the specified `id` and includes the avatar
 * information. The `avatarIncludes` is likely an object that specifies which fields of the avatar
 * should be included in the response.
 */
export function getUserByIdWithAvatar(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      avatar: { select: { id: true, height: true, width: true, url: true } },
    },
  });
}
