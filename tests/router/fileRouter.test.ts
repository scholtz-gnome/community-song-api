import request from "supertest";
import express, { Express } from "express";
import fileRouter from "../../src/routes/fileRouter";
import songRouter from "../../src/routes/songRouter";
import db from "../../db/db.connection";

describe("fileRouter", () => {
  const path: string = "/files";
  const app: Express = express();

  app.use(path, fileRouter);
  app.use("/songs", songRouter);
  beforeAll(async () => {
    jest.setTimeout(15000);
    await db.migrate.latest();
    await request(app)
      .post("/songs")
      .field({ title: "Nocturne in Eb" })
      .field({ artist: "Frédéric Chopin" })
      .attach(
        "file",
        `${__dirname}/Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf`,
        "Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf"
      );
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  describe("GET", () => {
    describe("When one song is retrieved from the S3 bucket", () => {
      it("responds with status code: 200", async () => {
        const res = await request(app).get(`${path}/1`);

        expect(JSON.parse(res.text).message).toBe("File retrieved");
        expect(JSON.parse(res.text).success).toBe(true);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When a file of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: 'File 'Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf' deleted'", async () => {
        const res = await request(app).delete(`${path}/1`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          "File 'Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf' deleted"
        );
        expect(res.status).toBe(200);
      });
    });
  });
});
