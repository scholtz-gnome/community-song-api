import "dotenv/config";

interface Config {
  PORT: string | undefined;
  NODE_ENV: string;
  MAX_FILE_SIZE: number;
  PROJECT_DIR: string;
  aws: { accessKey: string | undefined; secretAccessKey: string | undefined };
}

export const config: Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "test",
  MAX_FILE_SIZE: 50 * 1024 * 1024,
  PROJECT_DIR: __dirname,
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
