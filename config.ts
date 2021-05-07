import "dotenv/config";

interface Config {
  PORT: string;
  NODE_ENV: string;
  MAX_FILE_SIZE: number;
  EIGHT_HOURS: number;
  aws: { accessKey: string | undefined; secretAccessKey: string | undefined };
  HEROKU_POSTGRESQL_BLACK: string | undefined;
  HEROKU_POSTGRESQL_MAUVE: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  GOOGLE_CLIENT_ID: string | undefined;
  JWT_SECRET: string | undefined;
  SESSION_SECRET: string | undefined;
  APP_URL_ROOT: string | undefined;
  API_ROOT_URL: string | undefined;
  ROOT_DOMAIN: string | undefined;
}

const config: Config = {
  PORT: process.env.PORT || "4000",
  NODE_ENV: process.env.NODE_ENV || "test",
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  EIGHT_HOURS: 8 * 60 * 60,
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  HEROKU_POSTGRESQL_BLACK: process.env.HEROKU_POSTGRESQL_BLACK,
  HEROKU_POSTGRESQL_MAUVE: process.env.HEROKU_POSTGRESQL_MAUVE,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  APP_URL_ROOT: process.env.APP_URL_ROOT,
  API_ROOT_URL: process.env.API_ROOT_URL,
  ROOT_DOMAIN: process.env.ROOT_DOMAIN,
};

export default config;
