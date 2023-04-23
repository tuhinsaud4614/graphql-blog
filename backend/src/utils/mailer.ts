import {
  SendMailOptions,
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

import config from "./config";

const createDemoAccount = async () => {
  return createTestAccount();
};

/**
 * This function creates a mail transporter with the given username and password for authentication.
 * @param {string} user - The `usr` parameter is a string that represents the username or email address
 * used for authentication when sending emails through the SMTP server.
 * @param {string} password - The `pass` parameter is a string representing the password for the email
 * account being used to send emails through the SMTP server.
 */
function mailTransporter(user: string, password: string) {
  return createTransport({
    port: config.SMTP_PORT,
    host: config.SMTP_HOST,
    secure: false,
    // auth: {
    //   user: process.env.SMTP_USER || "w6o47kszasvmdbki@ethereal.email",
    //   pass: process.env.SMTP_PASSWORD || "fmupU2as65BQCCWpQD",
    // },
    auth: {
      user,
      pass: password,
    },
  });
}

/**
 * The function generates a verification email message with user information and a verification link.
 * @param {string} userId - a string representing the unique identifier of the user
 * @param {string} email - The email address of the user who wants to create an account.
 * @param {string} verificationCode - The verification code that the user needs to enter to verify
 * their account.
 * @param {string} href - The URL where the user can verify their account.
 * @returns an email message that includes the user ID, email, verification code, and a link to verify
 * the user's account. The message also includes an image and styling for the link button.
 */
export function generateVerificationMail(
  userId: string,
  email: string,
  verificationCode: string,
  href: string,
) {
  const link = `<a href="${href}">${href}</a>`;
  const message = `
      <img style="width:100px; height: 100px; padding: 30px 0;" alt="The RAT Diary" src="cid:unique@cid">
      <br/>
      <p style="margin-bottom: 20px;">We got a note saying you want to create an account with email ${email}.</p>
      <b style="color:red;">User ID:</b> ${userId}
      <br/>
      <b>Verification Code:</b> ${verificationCode}
      <br/>
      <br/>
      <a href="${href}" style="color:#ffffff;text-decoration:none;display:inline-block;height:38px;line-height:38px;padding-top:0;padding-right:24px;padding-bottom:0;padding-left:24px;border:0;outline:0;background-color:#1a8917;font-size:14px;font-style:normal;font-weight:400;text-align:center;white-space:nowrap;border-radius:99em" target="_blank">Verify user</a>
      <br/>
      <br/>
      <small>Or verify using this link:</small>
      <br/>
      ${link}
    `;
  return message;
}

/**
 * This function sends an email using a mail transporter and returns a URL for testing purposes, or
 * throws an error if the email is not sent.
 * @param {SendMailOptions} options - SendMailOptions is an interface that defines the options that can
 * be passed to the sendMail method of the mailTransporter object. It includes properties such as the
 * recipient email address, the subject of the email, the body of the email, and any attachments.
 * @returns The `sendMail` function is returning a Promise that resolves to the URL of the test message
 * sent by the `mailTransporter` function.
 */
export default async function sendMail(options: SendMailOptions) {
  const acc = await createDemoAccount();
  const info = await mailTransporter(acc.user, acc.pass).sendMail(options);
  return getTestMessageUrl(info);
}
