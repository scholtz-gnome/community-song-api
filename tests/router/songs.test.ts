import request from "supertest";
import db from "../../db/db.connection";
import app from "../../src/app";

describe("songsRouter", () => {
  const path: string = "/songs";

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

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "All songs retrieved",
          songs: [],
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("POST", () => {
    describe("When user is logged out", () => {
      it("responds with status code: 200, success: true, message: 'Song Octavarium created'", async () => {
        const res = await request(app)
          .post(path)
          .send({ title: "Octavarium", artist: "Dream Theater" });

        expect(JSON.parse(res.text)).toEqual({
          id: 1,
          title: "Octavarium",
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("GET", () => {
    describe("When all songs are requested", () => {
      it("responds with status code: 200, success: true, message: 'All songs retrieved'", async () => {
        const res = await request(app).get(path);

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "All songs retrieved",
          songs: [
            {
              title: "Octavarium",
              artist: "Dream Theater",
              email: null,
              firstName: null,
              id: 1,
            },
          ],
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("PATCH", () => {
    describe("When song of given id is updated", () => {
      it("responds with status code: 200, success: true, message: 'Octavarium updated'", async () => {
        const res = await request(app)
          .patch(`${path}/1`)
          .send({ title: "The Dance of Eternity", artist: "Dream Theater" });

        expect(res.status).toBe(200);
      });
    });
  });

  describe("GET", () => {
    describe("When song of given id is request", () => {
      it("responds with status code: 200, success: true, message: 'Octavarium song fetched'", async () => {
        const res = await request(app).get(`${path}/1`);

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "The Dance of Eternity retrieved",
          song: {
            id: 1,
            title: "The Dance of Eternity",
            artist: "Dream Theater",
          },
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When a song of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: ''The Dance of Eternity' deleted from database'", async () => {
        const res = await request(app).delete(`${path}/1`);

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "'The Dance of Eternity' deleted from database",
        });
        expect(res.status).toBe(200);
      });
    });
  });
});
