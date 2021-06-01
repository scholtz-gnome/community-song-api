import request from "supertest";
import db from "../../db/db.connection";
import app from "../../src/app";

describe("songsFileCollectionRouter", () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    await db.migrate.rollback();
    await db.migrate.latest();
    await request(app)
      .post("/songs")
      .send({ title: "Nocturne in Eb", artist: "Frédéric Chopin" });
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("PATCH", () => {
    describe("When ONE FILE-COLLECTION of song of given id is updated", () => {
      it("responds with status code: 200, success: true, message: 'File-collection updated'", async () => {
        const res = await request(app)
          .patch("/songs/1/file-collection")
          .attach(
            "file",
            `${__dirname}/test-files/Nocturne in Eb.pdf`,
            "Nocturne in Eb.pdf"
          )
          .attach(
            "file",
            `${__dirname}/test-files/react-beginners-handbook.pdf`,
            "react-beginners-handbook.pdf"
          )
          .field({
            fileNames: ["Updated Filename 1", "Updated Filename 2"],
            types: ["lyrics", "sheet music"],
          });

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "File-collection updated",
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When ONE FILE-COLLECTION of song of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: 'File-collection deleted'", async () => {
        const res = await request(app).delete("/songs/1/file-collection");

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "File-collection deleted",
        });
        expect(res.status).toBe(200);
      });
    });
  });
});
