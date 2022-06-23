import type { PrismaClient } from "@prisma/client";
import urlSlug from "url-slug";
import { EAuthorStatus, EUserRole } from "../utils/enums";
import { IRegisterUserInput } from "../utils/interfaces";

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

export function createUser(
  prisma: PrismaClient,
  {
    email,
    mobile,
    password,
    name,
    role,
  }: Omit<IRegisterUserInput, "confirmPassword">
) {
  const slug = urlSlug(name || email.substring(0, email.lastIndexOf("@")));

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
