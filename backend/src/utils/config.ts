import envSchema from "env-schema";

const properties = {
  PORT: {
    type: "number",
    default: 4000,
  },
  HOST: {
    type: "string",
    default: "http://localhost",
  },
  DATABASE_URL: {
    type: "string",
  },
  REDIS_URI: {
    type: "string",
  },
  SMTP_USER: {
    type: "string",
  },
  SMTP_PASSWORD: {
    type: "string",
  },
  SMTP_HOST: {
    type: "string",
  },
  SMTP_PORT: {
    type: "number",
  },
  SMTP_SECURITY: {
    type: "number",
  },
  ACCESS_TOKEN_SECRET_KEY: {
    type: "string",
  },
  REFRESH_TOKEN_SECRET_KEY: {
    type: "string",
  },
  ACCESS_TOKEN_EXPIRES: {
    type: "string",
  },
  REFRESH_TOKEN_EXPIRES: {
    type: "string",
  },
  CLIENT_ENDPOINT: {
    type: "string",
  },
};

type ENV = {
  PORT: number;
  HOST: string;
  DATABASE_URL: string;
  REDIS_URI: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURITY: number;
  ACCESS_TOKEN_SECRET_KEY: string;
  REFRESH_TOKEN_SECRET_KEY: string;
  ACCESS_TOKEN_EXPIRES: string;
  REFRESH_TOKEN_EXPIRES: string;
  CLIENT_ENDPOINT: string;
};

const schema = {
  type: "object",
  required: Object.keys(properties),
  properties,
};

const config = envSchema<ENV>({ schema, dotenv: true });
export default config;
