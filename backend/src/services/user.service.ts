import type { PrismaClient } from "@prisma/client";
import { EAuthorStatus, EUserRole } from "../utils/enums";
import { IRegisterInput } from "../utils/interfaces";

export function getUserById(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function getUserByEmail(prisma: PrismaClient, email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function getUserByMobile(prisma: PrismaClient, mobile: string) {
  return prisma.user.findUnique({ where: { mobile } });
}

export function getUserByEmailOrMobile(
  prisma: PrismaClient,
  email: string,
  mobile: string
) {
  return prisma.user.findFirst({ where: { OR: [{ email }, { mobile }] } });
}

const infoIncludes = {
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

export function getUserByIdWithInfo(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({ where: { id }, include: infoIncludes });
}

export function getUserByEmailOrMobileWithInfo(
  prisma: PrismaClient,
  email: string,
  mobile: string
) {
  return prisma.user.findFirst({
    where: { OR: [{ email }, { mobile }] },
    include: infoIncludes,
  });
}

export function getUserFollowerList(
  prisma: PrismaClient,
  id: string,
  followerId: string
) {
  return prisma.user.findFirst({
    where: { id, followers: { some: { id: followerId } } },
  });
}

export function getUserFollowingList(
  prisma: PrismaClient,
  id: string,
  followingId: string
) {
  return prisma.user.findFirst({
    where: { id, followings: { some: { id: followingId } } },
  });
}

export function createUser(
  prisma: PrismaClient,
  {
    email,
    mobile,
    password,
    name,
    role,
  }: Omit<IRegisterInput, "confirmPassword">
) {
  return prisma.user.create({
    data: {
      email,
      mobile,
      password,
      name,
      role,
      authorStatus: role === EUserRole.Author ? EAuthorStatus.Pending : null,
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
