import { envSchema } from "env-schema";
import type { StringValue } from "ms";

const properties = {
  NODE_ENV: {
    type: "string",
  },
  PORT: {
    type: "number",
    default: 4000,
  },
  HOST: {
    type: "string",
    default: "http://localhost",
  },
  CLIENT_ENDPOINT: {
    type: "string",
  },
  ALLOWED_ORIGINS: {
    type: "string",
  },
  GOOGLE_OAUTH2_CLIENT_ID: {
    type: "string",
  },
  GOOGLE_OAUTH2_CLIENT_SECRET: {
    type: "string",
  },
  GOOGLE_OAUTH2_CALLBACK_URL: {
    type: "string",
  },
  GOOGLE_OAUTH2_AUTHORIZATION_SUCCESS_REDIRECT_URL: {
    type: "string",
  },
  GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL: {
    type: "string",
  },
  DATABASE_URL: {
    type: "string",
  },
  REDIS_HOST: {
    type: "string",
  },
  REDIS_PORT: {
    type: "number",
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
  ES_STACK_VERSION: {
    type: "string",
  },
  ES_HOST: {
    type: "string",
  },
  ES_PORT: {
    type: "number",
  },
  KIBANA_PORT: {
    type: "number",
  },
  ELASTIC_USERNAME: {
    type: "string",
  },
  ELASTIC_PASSWORD: {
    type: "string",
  },
  KIBANA_PASSWORD: {
    type: "string",
  },
};

type ENV = {
  PORT: number;
  HOST: string;
  CLIENT_ENDPOINT: string;
  ALLOWED_ORIGINS: string;
  GOOGLE_OAUTH2_CLIENT_ID: string;
  GOOGLE_OAUTH2_CLIENT_SECRET: string;
  GOOGLE_OAUTH2_CALLBACK_URL: string;
  GOOGLE_OAUTH2_AUTHORIZATION_SUCCESS_REDIRECT_URL: string;
  GOOGLE_OAUTH2_AUTHORIZATION_FAILED_REDIRECT_URL: string;
  DATABASE_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURITY: number;
  ACCESS_TOKEN_SECRET_KEY: string;
  REFRESH_TOKEN_SECRET_KEY: string;
  ACCESS_TOKEN_EXPIRES: StringValue;
  REFRESH_TOKEN_EXPIRES: StringValue;
  STACK_VERSION: string;
  ES_HOST: string;
  ES_PORT: number;
  KIBANA_PORT: number;
  ELASTIC_USERNAME: string;
  ELASTIC_PASSWORD: string;
  KIBANA_PASSWORD: string;
};

const schema = {
  type: "object",
  required: Object.keys(properties),
  properties,
};

const config = envSchema<ENV>({ schema, dotenv: true });
export default config;
