import { Prisma, PrismaClient, User } from "@prisma/client";

import { imageUpload } from "@/utils";
import { IResponseWithCursor, IResponseWithOffset } from "@/utils/interfaces";
import type { CursorParams, RegisterInput } from "@/utils/types";

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

export function unfollowTo(prisma: PrismaClient, toId: string, ownId: string) {
  return prisma.user.update({
    where: { id: toId },
    data: { followers: { disconnect: { id: ownId } } },
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

/**
 * This function retrieves users from a database with optional pagination and filtering options.
 * @param {PrismaClient} prisma - A PrismaClient instance used to interact with the database.
 * @param {number} count - The total number of users that match the given condition.
 * @param {number} [page] - The page parameter is an optional parameter that specifies the page number
 * of the results to retrieve. It is used in conjunction with the limit parameter to implement
 * pagination. If page is not provided, all results will be returned.
 * @param {number} [limit] - The maximum number of records to be returned in a single page.
 * @param [condition] - An optional argument of type `Prisma.UserFindManyArgs` that allows for
 * filtering, sorting, and pagination options to be passed to the `findMany` method of the Prisma
 * client.
 * @returns an object of type `IResponseWithOffset<User>`. The object contains a `data` property which
 * is an array of `User` objects, a `total` property which is the total count of users, and a
 * `pageInfo` property which is an object containing information about the pagination such as whether
 * there is a next page, the next page number, the previous page number
 */
export async function getUsersWithOffset(
  prisma: PrismaClient,
  count: number,
  page?: number,
  limit?: number,
  condition?: Prisma.UserFindManyArgs,
) {
  if (limit && page) {
    const result = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      ...condition,
    });

    return {
      data: result,
      total: count,
      pageInfo: {
        hasNext: limit * page < count,
        nextPage: page + 1,
        previousPage: page - 1,
        totalPages: Math.ceil(count / limit),
      },
    } as IResponseWithOffset<User>;
  }

  const result = await prisma.user.findMany(condition);
  return { data: result, total: count } as IResponseWithOffset<User>;
}

/**
 * This function retrieves a list of users from a database using cursor-based pagination and returns
 * the results along with pagination information.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {CursorParams} params - The `params` parameter is an object containing the `limit` and
 * `after` properties. `limit` specifies the maximum number of results to return, while `after` is an
 * optional cursor indicating where to start the next page of results.
 * @param condition - The `condition` parameter is an object of type `Prisma.UserFindManyArgs` which
 * contains the conditions to filter the results of the `prisma.user.findMany` query. It can include
 * properties such as `where`, `orderBy`, `select`, `include`, etc. to customize the
 * @param {number} total - The total parameter is the total number of items that match the given
 * condition in the database.
 * @returns This function returns a Promise that resolves to an object with three properties: `total`,
 * `pageInfo`, and `edges`. The `total` property is a number representing the total number of users
 * that match the given condition. The `pageInfo` property is an object with two properties: `hasNext`
 * (a boolean indicating whether there are more results to be fetched) and `endCursor`
 */
export async function getUsersWithCursor(
  prisma: PrismaClient,
  params: CursorParams,
  condition: Prisma.UserFindManyArgs,
  total: number,
): Promise<IResponseWithCursor<User>> {
  const { limit, after } = params;
  let results: User[] = [];
  let newFindArgs = {
    ...condition,
  };

  if (after) {
    newFindArgs = {
      ...newFindArgs,
      skip: 1,
      take: limit,
      cursor: { id: after },
    };
  } else {
    newFindArgs = { ...newFindArgs, take: limit };
  }
  results = await prisma.user.findMany({
    ...newFindArgs,
  });

  // This for has next page
  const resultsLen = results.length;
  if (resultsLen > 0) {
    const lastPost = results[resultsLen - 1];
    const newResults = await prisma.user.findMany({
      ...condition,
      skip: 1,
      take: 1,
      cursor: {
        id: lastPost.id,
      },
    });

    return {
      total,
      pageInfo: {
        hasNext: !!newResults.length,
        endCursor: lastPost.id,
      },
      edges: results.map((post) => ({ cursor: post.id, node: post })),
    };
  }
  // This for has next page end

  return {
    total,
    pageInfo: {
      hasNext: false,
      endCursor: null,
    },
    edges: [],
  };
}

/**
 * This function retrieves the count of followers for a specific user using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows us to
 * interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user
 * in the database. It is used to find a specific user in the `user` table of the database.
 * @returns the count of followers for a user with the specified ID using the Prisma client. The count
 * is returned as an object with a single property `_count` which has a nested property `followers`
 * that contains the actual count value.
 */
export function getUserFollowersCount(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { _count: { select: { followers: true } } },
  });
}

/**
 * This function retrieves the count of a user's followings using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows you to
 * interact with your database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user
 * in the database. It is used to find a specific user in the `user` table of the database.
 * @returns the count of followings for a user with the specified id using the Prisma client.
 */
export function getUserFollowByCount(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { _count: { select: { followings: true } } },
  });
}

/**
 * This function checks if a user with ID "myId" is a follower of another user with ID
 * "toId" using the Prisma ORM.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client used to interact
 * with the database.
 * @param {string} myId - The `myId` parameter is a string representing the ID of the user who is
 * checking if they are a follower of another user.
 * @param {string} toId - The `toId` parameter is a string representing the ID of the user that we want
 * to check if they have a follower with the ID `myId`.
 * @returns The `isFollower` function is returning a Promise that resolves to a user object if the user
 * with the `toId` has a follower with the `myId` id. If there is no such user or follower, the Promise
 * will resolve to `null`.
 */
export function isFollower(prisma: PrismaClient, myId: string, toId: string) {
  return prisma.user.findFirst({
    where: {
      id: toId,
      followers: { some: { id: myId } },
    },
  });
}

/**
 * This function retrieves the count of followers and followings for a user using
 * PrismaClient.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user
 * in the database. It is used to find a specific user in the `user` table of the database.
 * @returns the count of followers and followings for a user with the given `id` using the
 * `PrismaClient` instance `prisma`. The count is returned as an object with two properties:
 * `followers` and `followings`.
 */
export function getUserFollowCount(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { _count: { select: { followers: true, followings: true } } },
  });
}

/**
 * This function retrieves the followings of a user with a given ID using PrismaClient.
 * @param {PrismaClient} prisma - The PrismaClient instance used to interact with the database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user
 * in the database. It is used to find a specific user in the `user` table using the `findUnique`
 * method of the Prisma client.
 * @returns a Promise that resolves to an array of followings for a user with the specified id. The
 * followings are obtained by calling the `followings()` method on the user object returned by the
 * `findUnique()` method of the PrismaClient instance.
 */
export function getUserFollowBy(prisma: PrismaClient, id: string) {
  return prisma.user
    .findUnique({
      where: { id },
    })
    .followings();
}

/**
 * This function retrieves the followers of a user with a given ID using PrismaClient.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows you to
 * interact with your database.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user
 * in the database. It is used to find a specific user in the `user` table of the database.
 * @returns a Promise that resolves to an array of followers for a user with the specified id. The
 * followers are obtained by calling the `followers()` method on the user object obtained from the
 * Prisma client.
 */
export function getUserFollowers(prisma: PrismaClient, id: string) {
  return prisma.user
    .findUnique({
      where: { id },
    })
    .followers();
}

/**
 * This function retrieves the avatar picture of a user from a Prisma database.
 * @param {PrismaClient} prisma - PrismaClient is an instance of the Prisma client that allows you to
 * interact with your database using Prisma's query builder.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user in the database. It is used as a filter condition to find the user's avatar picture in the
 * `picture` table using the `findFirst` method of the Prisma client.
 * @returns The function `getUserAvatar` returns a Promise that resolves to the first picture object
 * found in the Prisma database that has a `userId` matching the provided `userId` argument.
 */
export function getUserAvatar(prisma: PrismaClient, userId: string) {
  return prisma.picture.findFirst({ where: { userId } });
}
