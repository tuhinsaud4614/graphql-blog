import { GraphQLYogaError } from "@graphql-yoga/node";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  SendMailOptions,
} from "nodemailer";
import config from "./config";

const createDemoAccount = async () => {
  return createTestAccount();
};

const transporter = (usr: string, pass: string) =>
  createTransport({
    port: config.SMTP_PORT,
    host: config.SMTP_HOST,
    secure: false,
    // auth: {
    //   user: process.env.SMTP_USER || "w6o47kszasvmdbki@ethereal.email",
    //   pass: process.env.SMTP_PASSWORD || "fmupU2as65BQCCWpQD",
    // },
    auth: {
      user: usr,
      pass: pass,
    },
  });

const sendMail = async (options: SendMailOptions) => {
  try {
    const acc = await createDemoAccount();
    const info = await transporter(acc.user, acc.pass).sendMail(options);
    return getTestMessageUrl(info);
  } catch (error: any) {
    // logger.error(error.message);
    console.log(error.message);
    throw new GraphQLYogaError("Email not sent");
  }
};

export default sendMail;
