import { config } from "./config";
import pg from "pg";

pg.defaults.ssl = true;

module.exports = {
  test: {
    client: "pg",
    connection: config.HEROKU_POSTGRESQL_WHITE_URL,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  development: {
    client: "pg",
    connection: config.HEROKU_POSTGRESQL_YELLOW_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: config.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
