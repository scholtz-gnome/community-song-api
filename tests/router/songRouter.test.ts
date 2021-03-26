import request from "supertest";
import express, { Express } from "express";
import songRouter from "../../src/routes/songRouter";

describe("songRouter", () => {
  const path = "/songs";
  const app: Express = express();
  app.use("/songs", songRouter);

  describe("POST", () => {
    describe("When no file is attached", () => {
      it("responds with a 400 code", async (done) => {
        const response = await request(app).post(path);

        expect(response.status).toEqual(400);
        done();
      });
    });

    describe("When a file with a valid file-type is attached", () => {
      const fileType = "pdf";
      const fileName = `testFile.${fileType}`;

      describe("When the file is smaller than the upper limit", () => {
        it("responds with a 200 code", async (done) => {
          const fileBuffer = Buffer.alloc(5, 1, "utf-8");

          const response = await request(app)
            .post(path)
            .attach("file", fileBuffer, fileName);

          expect(response.status).toEqual(200);
          done();
        });
      });

      describe("When the file is larger than the upper limit", () => {
        it("responds with a 413 code", async (done) => {
          const FIFY_ONE_MEGABYTES = 51 * 1024 * 1024;
          const fileBuffer = Buffer.alloc(FIFY_ONE_MEGABYTES, 1, "utf-8");

          const response = await request(app)
            .post(path)
            .attach("file", fileBuffer, fileName);

          expect(response.status).toEqual(413);
          expect(response.text).toBe("File is too big. Max size is 50MB.");
          done();
        });
      });
    });
  });
});
