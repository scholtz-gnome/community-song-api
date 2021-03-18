"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexConfig = void 0;
exports.knexConfig = {
    test: {
        client: "pg",
        connection: {
            host: "localhost",
            user: "postgres",
            password: "admin",
            database: "comm_song_test",
        },
        migrations: {
            directory: "./src/db/migrations",
        },
        seeds: {
            directory: "./src/db/seeds",
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
            directory: "./src/db/migrations",
        },
        seeds: {
            directory: "./src/db/seeds",
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
            directory: "./src/db/migrations",
        },
        seeds: {
            directory: "./src/db/seeds",
        },
    },
};
