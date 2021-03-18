import "dotenv/config";

interface Config {
  PORT: string | undefined;
  NODE_ENV: string;
}

export const config: Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "test",
};
