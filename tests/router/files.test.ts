import request from "supertest";
import express, { Express } from "express";
import songsRouter from "../../src/routes/songsRouter";
import filesRouter from "../../src/routes/filesRouter";
import db from "../../db/db.connection";

describe("filesRouter", () => {
  const filesPath: string = "/files";
  const app: Express = express();

  app.use(filesRouter);
  app.use(songsRouter);

  beforeAll(async () => {
    jest.setTimeout(25000);
    await db.migrate.latest();
    await request(app)
      .post("/songs")
      .field({ title: "Nocturne in Eb" })
      .field({ artist: "Frédéric Chopin" });
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  describe("GET", () => {
    describe("When one song is retrieved from the S3 bucket", () => {
      it("responds with status code: 200", async () => {
        const res = await request(app).get(`${filesPath}/1`);

        expect(JSON.parse(res.text).message).toBe("File retrieved");
        expect(JSON.parse(res.text).success).toBe(true);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("POST", () => {
    describe("When one file is uploaded", () => {
      it("responds with status code: 200, message: 'File Nocturne in Eb.pdf created'", async () => {
        const res = await request(app)
          .post(`${filesPath}`)
          .field({ songId: 1 })
          .attach(
            "file",
            `${__dirname}/test-files/Nocturne in Eb.pdf`,
            "Nocturne in Eb.pdf"
          );

        expect(JSON.parse(res.text).message).toBe(
          "File Nocturne in Eb.pdf created"
        );
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When a file of given id is deleted", () => {
      it("responds with status code: 200, success: true, and message", async () => {
        const res = await request(app).delete(`${filesPath}/1`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          "File 'Nocturne in Eb.pdf' deleted"
        );
        expect(res.status).toBe(200);
      });
    });
  });
});
