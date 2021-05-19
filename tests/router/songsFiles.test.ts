import request from "supertest";
import express, { Express } from "express";
import db from "../../db/db.connection";
import songsFilesRouter from "../../src/routes/songsFilesRouter";
import songRouter from "../../src/routes/songRouter";

describe("songsFilesRouter", () => {
  const path: string = "/songs";
  const app: Express = express();

  app.use(songsFilesRouter);
  app.use(path, songRouter);

  beforeAll(async () => {
    jest.setTimeout(30000);
    await db.migrate.rollback();
    await db.migrate.latest();
    await request(app)
      .post(path)
      .field({ title: "Nocturne in Eb" })
      .field({ artist: "Frédéric Chopin" })
      .attach(
        "file",
        `${__dirname}/test-files/Nocturne in Eb.pdf`,
        "Nocturne in Eb.pdf"
      );
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("GET", () => {
    describe("When one file is retrieved", () => {
      it("responds with status code 200 and an array with one base64 encoded string", async () => {
        const res = await request(app).get(`${path}/1/files`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe("File bodies retrieved");
        expect(JSON.parse(res.text).files[0]).toMatch(
          new RegExp(/(?=^(.{4})*$)[A-Za-z+0-9/]/g)
        );
        expect(res.status).toBe(200);
      });
    });
  });
});
