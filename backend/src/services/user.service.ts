import type { PrismaClient } from "@prisma/client";
import urlSlug from "url-slug";
import { nanoid } from "../utils";
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

export function getUserBySlug(prisma: PrismaClient, slug: string) {
  return prisma.user.findUnique({ where: { slug } });
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
  const slug =
    urlSlug(name || email.substring(0, email.lastIndexOf("@")), {
      separator: "_",
    }) +
    "_" +
    nanoid(4);

  return prisma.user.create({
    data: {
      email,
      mobile,
      password,
      name,
      role,
      slug,
      authorStatus: role === EUserRole.Author ? EAuthorStatus.Pending : null,
    },
  });
}
