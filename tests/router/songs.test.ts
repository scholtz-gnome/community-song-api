import request from "supertest";
import express, { Express } from "express";
import songsRouter from "../../src/routes/songsRouter";
import db from "../../db/db.connection";

describe("songsRouter", () => {
  const path: string = "/songs";
  const app: Express = express();

  app.use(songsRouter);

  beforeAll(async () => {
    jest.setTimeout(15000);
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
    describe("When user is logged out", () => {
      it("responds with status code: 200, success: true, message: 'Song Octavarium created'", async () => {
        const res = await request(app)
          .post(path)
          .field({ title: "Octavarium", artist: "Dream Theater" });

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe("Song Octavarium created");
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
        ]);
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When a song of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: ''Octavarium' deleted from database'", async () => {
        const res = await request(app).delete(`${path}/1`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          "'Octavarium' deleted from database"
        );
        expect(res.status).toBe(200);
      });
    });
  });
});
