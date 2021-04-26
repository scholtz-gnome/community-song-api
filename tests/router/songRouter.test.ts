import request from "supertest";
import express, { Express } from "express";
import songRouter from "../../src/routes/songRouter";
import db from "../../db/db.connection";

describe("songRouter", () => {
  const path: string = "/songs";
  const app: Express = express();

  app.use("/songs", songRouter);

  beforeAll(async () => {
    jest.setTimeout(40000);
    await db.migrate.latest();
  });

  describe("GET", () => {
    describe("When there are no songs in the database", () => {
      it("responds with status code: 200, success: true, message: 'All songs retrieved'", async () => {
        const res = await request(app).get(path);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe("All songs retrieved");
        expect(JSON.parse(res.text).songs).toEqual([]);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("POST", () => {
    describe("When no file is attached", () => {
      it("responds with status code: 200, success: true, message: 'Song Octavarium created'", async () => {
        const res = await request(app)
          .post(path)
          .send({ title: "Octavarium", artist: "Dream Theater" });

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe("Song Octavarium created");
        expect(res.status).toBe(200);
      });
    });

    // describe("When a file is attached", () => {
    //   it("responds with status code: 200, success: true, message: 'Song Nocturne in Eb created'", async () => {
    //     // s3 bucket stuff here
    //   });
    // });
  });

  describe("GET", () => {
    describe("When all songs are requested", () => {
      it("responds with status code: 200, success: true, message: 'All songs retrieved'", async () => {
        const res = await request(app).get(path);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe("All songs retrieved");
        expect(JSON.parse(res.text).songs).toEqual([
          {
            title: "Octavarium",
            artist: "Dream Theater",
            email: null,
            firstName: null,
            id: 1,
            url: null,
          },
        ]);
        expect(res.status).toBe(200);
      });
    });
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  // describe("POST", () => {
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
