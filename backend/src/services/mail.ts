import type { Attachment } from "nodemailer/lib/mailer";
import path from "path";

import logger from "@/logger";
import { nanoid } from "@/utils";
import { generateUserVerificationKey } from "@/utils/constants";
import sendMail, { generateVerificationMail } from "@/utils/mailer";
import redisClient from "@/utils/redis";

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
  host?: string,
) {
  const verificationCode = nanoid(6);
  const href = `${
    host || "http://localhost:4000"
  }/account/verify?userId=${userId}&code=${verificationCode}`;
  const attachments: Attachment[] = [
    {
      cid: "unique@cid",
      filename: "logo.svg",
      path: path.join(process.cwd(), "public", "logo.svg"),
    },
  ];
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
