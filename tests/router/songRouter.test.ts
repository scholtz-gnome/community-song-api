import request from "supertest";
import express, { Express } from "express";
import songRouter from "../../src/routes/songRouter";
import db from "../../db/db.connection";

describe("songRouter", () => {
  const path: string = "/songs";
  const app: Express = express();

  app.use(path, songRouter);

  beforeAll(async () => {
    jest.setTimeout(30000);
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll(async () => {
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
          .field({ title: "Octavarium", artist: "Dream Theater" });

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
          `Song Nocturne in Eb created`
        );
        expect(res.status).toBe(200);
      });

      it("responds with status code: 200, success: true, message: 'Song React Book created'", async () => {
        const res = await request(app)
          .post(path)
          .field({ title: "React Book" })
          .field({ artist: "Flavio Copes" })
          .attach(
            "file",
            `${__dirname}/react-beginners-handbook.pdf`,
            "react-beginners-handbook.pdf"
          );

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(`Song React Book created`);
        expect(res.status).toBe(200);
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
          },
          {
            title: "Nocturne in Eb",
            artist: "Frédéric Chopin",
            email: null,
            firstName: null,
            id: 2,
          },
          {
            title: "React Book",
            artist: "Flavio Copes",
            email: null,
            firstName: null,
            id: 3,
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
  });
});
