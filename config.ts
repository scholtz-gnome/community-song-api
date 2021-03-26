import "dotenv/config";

interface Config {
  PORT: string | undefined;
  NODE_ENV: string;
  MAX_FILE_SIZE: number;
}

export const config: Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "test",
  MAX_FILE_SIZE: 50 * 1024 * 1024,
};
