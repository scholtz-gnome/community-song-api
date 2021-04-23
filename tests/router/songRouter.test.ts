import request from "supertest";
import express, { Express } from "express";
import songRouter from "../../src/routes/songRouter";
import db from "../../db/db.connection";

describe("songRouter", () => {
  const path: string = "/songs";
  const app: Express = express();
  app.use("/songs", songRouter);

  beforeAll(async () => {
    jest.setTimeout(15000);
    await db.migrate.latest();
  });

  describe("POST", () => {
    test("/songs posts a song and responds with 200 status code and song name", async () => {
      const res = await request(app).post(path).send({
        title: "Octavarium",
        artist: "Dream Theater",
      });

      expect(res).toBe(200);
    });
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  // describe("POST", () => {
  // describe("When no file is attached", () => {
  //   it("responds with a 400 code", async (done) => {
  //     const response = await request(app).post(path);

  //     expect(response.status).toEqual(400);
  //     done();
  //   });
  // });

  //   describe("When a file with a valid file-type is attached", () => {
  //     const fileType = "pdf";
  //     const fileName = `testFile.${fileType}`;

  //     describe("When the file is smaller than the upper limit", () => {
  //       it("responds with a 200 code", async (done) => {
  //         const fileBuffer = Buffer.alloc(5, 1, "utf-8");

  //         const response = await request(app)
  //           .post(path)
  //           .field({ title: `${fileName}` })
  //           .attach("file", fileBuffer, fileName);

  //         expect(response.body.message).toBe(
  //           `File "${fileName}" uploaded successfully`
  //         );
  //         expect(response.status).toEqual(200);
  //         done();
  //       });
  //     });

  //     describe("When the file is larger than the upper limit", () => {
  //       it("responds with a 413 code", async (done) => {
  //         const ELEVEN_ONE_MEGABYTES = 11 * 1024 * 1024;
  //         const fileBuffer = Buffer.alloc(ELEVEN_ONE_MEGABYTES, 1, "utf-8");

  //         const response = await request(app)
  //           .post(path)
  //           .attach("file", fileBuffer, fileName);

  //         expect(response.status).toEqual(413);
  //         expect(response.body.message).toBe(
  //           "File size exceeded. Cannot exceed 10MB."
  //         );
  //         done();
  //       });
  //     });
  //   });
  // });
});
