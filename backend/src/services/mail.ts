import type { Attachment } from "nodemailer/lib/mailer";
import path from "path";

import logger from "@/logger";
import { nanoid } from "@/utils";
import {
  generateResetPasswordVerificationKeyForId,
  generateUserVerificationKey,
} from "@/utils/constants";
import sendMail, { generateVerificationMail } from "@/utils/mailer";
import redisClient from "@/utils/redis";

const attachments: Attachment[] = [
  {
    cid: "unique@cid",
    filename: "logo.svg",
    path: path.join(process.cwd(), "public", "logo.svg"),
  },
];

/**
 * This function sends an email with a verification code to a user's email address and stores the code
 * in Redis for a limited time.
 * @param {string} userId - A string representing the unique identifier of the user for whom the
 * verification code is being sent.
 * @param {string} email - The email address of the user who needs to receive the verification code.
 * @param {string} [host] - The `host` parameter is an optional string that represents the base URL of
 * the application. If provided, it will be used to generate the verification link that is sent to the
 * user's email. If not provided, the default value of `http://localhost:4000` will be used.
 */
export async function sendVerificationCodeService(
  userId: string,
  email: string,
  verificationLink: string,
  host = "http://localhost:4000",
) {
  const verificationCode = nanoid(6);
  const href = `${host}${verificationLink}?userId=${userId}&code=${verificationCode}`;

  const html = generateVerificationMail(userId, email, verificationCode, href);

  const info = await sendMail({
    from: "foo@example.com",
    to: email,
    subject: "The RAT Diary account verification code",
    html,
    attachments,
  });
  logger.info(info);

  await redisClient.setex(
    generateUserVerificationKey(userId),
    600,
    verificationCode,
  );
}

/**
 * This function sends a verification code to a user's email for resetting their password and stores
 * the code and password hash in Redis for later use.
 * @param {string} userId - a string representing the user ID of the user who is requesting a password
 * reset.
 * @param {string} email - The email address of the user who requested a password reset.
 * @param {string} password - The password parameter is a string that represents the new password that
 * the user wants to set. It is used to generate a hash that will be stored in Redis along with the
 * verification code.
 * @param {string} [host] - The host parameter is an optional string that represents the base URL of
 * the application. If it is not provided, the default value is "http://localhost:4000". It is used to
 * generate the verification link that will be sent to the user's email.
 */
export async function sendResetPasswordVerificationCodeService(
  userId: string,
  email: string,
  password: string,
  verificationLink: string,
  host = "http://localhost:4000",
) {
  const verificationCode = nanoid(6);
  const href = `${host}${verificationLink}?code=${verificationCode}`;

  const html = generateVerificationMail(userId, email, verificationCode, href);

  const info = await sendMail({
    from: "foo@example.com",
    to: email,
    subject: "The RAT Diary reset password verification code",
    html,
    attachments,
  });
  logger.info(info);

  await redisClient.setex(
    generateResetPasswordVerificationKeyForId(userId),
    600,
    JSON.stringify({ code: verificationCode, hash: password }),
  );
}
