import request from "supertest";
import db from "../../db/db.connection";
import app from "../../src/app";

describe("songsFileCollectionsRouter", () => {
  const path: string = "/songs";

  beforeAll(async () => {
    jest.setTimeout(20000);
    await db.migrate.rollback();
    await db.migrate.latest();
    await request(app)
      .post(path)
      .send({ title: "Nocturne in Eb", artist: "Frédéric Chopin" });
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("POST", () => {
    describe("When ONE FILE-COLLECTION is created for song of given id", () => {
      it("responds with status code: 200, success: true, message: File-collection created", async () => {
        const res = await request(app)
          .post(`${path}/1/file-collections`)
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
            fileNames: ["Nocturne", "React Book"],
            types: ["chords and lyrics", "sheet music"],
          });

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "File-collection created",
        });
        expect(res.status).toBe(200);
      });
    });
  });
});
