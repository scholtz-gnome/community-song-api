module.exports = {
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "admin",
      database: "comm_song_test",
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
      host: "localhost",
      user: "postgres",
      password: "admin",
      database: "comm_song_dev",
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
      host: "localhost",
      user: "postgres",
      password: "admin",
      database: "comm_song",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
