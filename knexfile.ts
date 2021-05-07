import config from "./config";

module.exports = {
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "admin",
      database: "test",
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  githubTest: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "test",
      password: "test",
      database: "test",
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  development: {
    client: "pg",
    connection: {
      connectionString: config.HEROKU_POSTGRESQL_MAUVE,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: config.HEROKU_POSTGRESQL_BLACK,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
