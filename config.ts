import "dotenv/config";

interface Config {
  PORT: string | undefined;
  NODE_ENV: string;
  MAX_FILE_SIZE: number;
  PROJECT_DIR: string;
  aws: { accessKey: string | undefined; secretAccessKey: string | undefined };
  DATABASE_URL: string | undefined;
  HEROKU_POSTGRESQL_YELLOW_URL: string | undefined;
  HEROKU_POSTGRESQL_WHITE_URL: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  GOOGLE_CLIENT_ID: string | undefined;
  COOKIE_KEY: string | undefined;
}

const config: Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "test",
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  PROJECT_DIR: __dirname,
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  DATABASE_URL: process.env.DATABASE_URL,
  HEROKU_POSTGRESQL_YELLOW_URL: process.env.HEROKU_POSTGRESQL_YELLOW_URL,
  HEROKU_POSTGRESQL_WHITE_URL: process.env.HEROKU_POSTGRESQL_WHITE_URL,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  COOKIE_KEY: process.env.COOKIE_KEY,
};

export default config;
