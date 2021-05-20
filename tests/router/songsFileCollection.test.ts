import request from "supertest";
import express, { Express } from "express";
import songsRouter from "../../src/routes/songsRouter";
import songsFileCollectionRouter from "../../src/routes/songsFileCollectionRouter";
import db from "../../db/db.connection";

describe("songsFileCollectionRouter", () => {
  const app: Express = express();

  app.use(songsFileCollectionRouter);
  app.use(songsRouter);

  beforeAll(async () => {
    jest.setTimeout(20000);
    await db.migrate.rollback();
    await db.migrate.latest();
    await request(app)
      .post("/songs")
      .field({ title: "Nocturne in Eb" })
      .field({ artist: "Frédéric Chopin" });
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("POST", () => {
    it("responds with status code: 200", async () => {
      const res = await request(app)
        .post(`/songs/1/file-collection`)
        .attach(
          "file",
          `${__dirname}/test-files/Nocturne in Eb.pdf`,
          "Nocturne in Eb.pdf"
        )
        .attach(
          "file",
          `${__dirname}/test-files/react-beginners-handbook.pdf`,
          "react-beginners-handbook.pdf"
        );

      expect(JSON.parse(res.text).message).toBe("2 files created");
      expect(res.status).toBe(200);
    });
  });
});
