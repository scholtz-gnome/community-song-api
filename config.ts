import "dotenv/config";

interface Config {
  PORT: string;
  NODE_ENV: string;
  MAX_FILE_SIZE: number;
  aws: { accessKey: string | undefined; secretAccessKey: string | undefined };
  DATABASE_URL: string | undefined;
  HEROKU_POSTGRESQL_YELLOW_URL: string | undefined;
  HEROKU_POSTGRESQL_WHITE_URL: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  GOOGLE_CLIENT_ID: string | undefined;
  JWT_SECRET: string | undefined;
  APP_URL_ROOT: string | undefined;
  API_ROOT_URL: string | undefined;
}

const config: Config = {
  PORT: process.env.PORT || "4000",
  NODE_ENV: process.env.NODE_ENV || "test",
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  DATABASE_URL: process.env.DATABASE_URL,
  HEROKU_POSTGRESQL_YELLOW_URL: process.env.HEROKU_POSTGRESQL_YELLOW_URL,
  HEROKU_POSTGRESQL_WHITE_URL: process.env.HEROKU_POSTGRESQL_WHITE_URL,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL_ROOT: process.env.APP_URL_ROOT,
  API_ROOT_URL: process.env.API_ROOT_URL,
};

export default config;
