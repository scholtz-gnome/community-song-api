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

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
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

    describe("When a file is attached", () => {
      it("responds with status code: 200, success: true, message: 'Song Nocturne in Eb created'", async () => {
        const res = await request(app)
          .post(path)
          .field({ title: "Nocturne in Eb" })
          .field({ artist: "Frédéric Chopin" })
          .attach(
            "file",
            `${__dirname}/Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf`,
            "Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf"
          );

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          `File "Nocturne in Eb" uploaded successfully`
        );
        expect(res.status).toBe(200);
      });
    });

    describe("When a file size exceeds the upper limit", () => {
      it("responds with status code: 413, success: false, message: 'File size exceeded. Cannot exceed 10MB.'", async () => {
        const res = await request(app)
          .post(path)
          .field({ title: "Linux Commands" })
          .field({ artist: "Stephen" })
          .attach(
            "file",
            `${__dirname}/linux-commands-handbook.pdf`,
            "linux-commands-handbook.pdf"
          );

        expect(JSON.parse(res.text).success).toBe(false);
        expect(JSON.parse(res.text).message).toBe(
          "File size exceeded. Cannot exceed 10MB."
        );
        expect(res.status).toBe(413);
      });
    });

    describe("When a file is not in .pdf or .txt format", () => {
      it("responds with status code: 400, success: false, message: 'Wrong file type. Must be .pdf or .txt'", async () => {
        const res = await request(app)
          .post(path)
          .field({ title: "Can I do HTML" })
          .field({ artist: "HTML Man" })
          .attach("file", `${__dirname}/test.html`, "test.html");

        expect(JSON.parse(res.text).success).toBe(false);
        expect(JSON.parse(res.text).message).toBe(
          "Wrong file type. Must be .pdf or .txt"
        );
        expect(res.status).toBe(400);
      });
    });
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
          {
            title: "Nocturne in Eb",
            artist: "Frédéric Chopin",
            email: null,
            firstName: null,
            id: 2,
            url: "Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf",
          },
        ]);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When a song of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: ''Octavarium' deleted from database'", async () => {
        const res = await request(app).delete(`${path}/song/1`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          "'Octavarium' deleted from database"
        );
        expect(res.status).toBe(200);
      });
    });

    describe("When a file of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: 'File 'Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf' deleted'", async () => {
        const res = await request(app).delete(`${path}/file/2`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          "File 'Chopin-frederic-nocturnes-opus-9-no-2-1508.pdf' deleted"
        );
        expect(res.status).toBe(200);
      });
    });
  });
});
