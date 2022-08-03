import type { PrismaClient } from "@prisma/client";
import path from "path";
import { nanoid } from "../utils";
import { USER_VERIFICATION_KEY_NAME } from "../utils/constants";
import { EAuthorStatus, EUserRole } from "../utils/enums";
import { IRegisterInput } from "../utils/interfaces";
import sendMail from "../utils/mailer";
import redisClient from "../utils/redis";

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

export function verifyAuthorStatus(prisma: PrismaClient, userId: string) {
  return prisma.user.update({
    data: { authorStatus: EAuthorStatus.Verified },
    where: { id: userId },
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

export const userVerificationMessage = (
  userId: string,
  code: string,
  email: string,
  host?: string
) => {
  const href = `${
    host || "http://localhost:4000"
  }/account/verify?userId=${userId}&code=${code}`;

  const link = `<a href="${href}">${href}</a>`;

  const message = `
    <img style="width:100px; height: 100px; padding: 30px 0;" alt="The RAT Diary" src="cid:unique@cid">
    <br/>
    <p style="margin-bottom: 20px;">We got a note saying you want to create an account with email ${email}.</p>
    <b style="color:red;">User ID:</b> ${userId}
    <br/>
    <b>Verification Code:</b> ${code}
    <br/>
    <br/>
    <a href="${href}" style="color:#ffffff;text-decoration:none;display:inline-block;height:38px;line-height:38px;padding-top:0;padding-right:24px;padding-bottom:0;padding-left:24px;border:0;outline:0;background-color:#1a8917;font-size:14px;font-style:normal;font-weight:400;text-align:center;white-space:nowrap;border-radius:99em" target="_blank">Verify email</a>
    <br/>
    <br/>
    <small>Or verify using this link:</small>
    <br/>
    ${link}
  `;

  return message;
};

export const sendMailToUser = async (to: string, message: string) => {
  const info = await sendMail({
    from: "foo@example.com",
    to: to,
    subject: "The RAT Diary account verification code",
    html: message,
    attachments: [
      {
        cid: "unique@cid",
        filename: "logo.svg",
        path: path.join(process.cwd(), "public", "logo.svg"),
      },
    ],
  });
  console.info(info);
};

export const sendUserVerificationCode = async (
  userId: string,
  email: string,
  host?: string
) => {
  const verificationCode = nanoid(6);
  const message = userVerificationMessage(
    userId,
    verificationCode,
    email,
    host
  );
  await redisClient.setEx(
    USER_VERIFICATION_KEY_NAME(userId),
    600,
    verificationCode
  );
  await sendMailToUser(email, message);
};
