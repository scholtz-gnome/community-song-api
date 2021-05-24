import request from "supertest";
import db from "../../db/db.connection";
import app from "../../src/app";

describe("songsFilesRouter", () => {
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
    describe("When ONE FILE is created for song of given id", () => {
      it("responds with status code: 200, success: true, message: File 'Nocturne in Eb' created", async () => {
        const res = await request(app)
          .post(`${path}/1/files`)
          .attach(
            "file",
            `${__dirname}/test-files/Nocturne in Eb.pdf`,
            "Nocturne in Eb.pdf"
          );

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "File 'Nocturne in Eb.pdf' created",
        });
        expect(res.status).toBe(200);
      });
    });

    describe("When ONE FILE is created for song of given id", () => {
      it("responds with status code: 200, success: true, message: File 'react-beginners-handbook.pdf' created", async () => {
        const res = await request(app)
          .post(`${path}/1/files`)
          .attach(
            "file",
            `${__dirname}/test-files/react-beginners-handbook.pdf`,
            "react-beginners-handbook.pdf"
          );

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "File 'react-beginners-handbook.pdf' created",
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("GET", () => {
    describe("When ALL FILES of given id are retrieved", () => {
      it("responds with status code 200 and an array of two base64 encoded strings", async () => {
        const res = await request(app).get(`${path}/1/files`);

        expect(JSON.parse(res.text).success).toBe(true);
        expect(JSON.parse(res.text).message).toBe(
          "All files of song retrieved"
        );
        expect(JSON.parse(res.text).files[0]).toMatch(
          new RegExp(/(?=^(.{4})*$)[A-Za-z+0-9/]/g)
        );
        expect(JSON.parse(res.text).files[1]).toMatch(
          new RegExp(/(?=^(.{4})*$)[A-Za-z+0-9/]/g)
        );
        expect(res.status).toBe(200);
      });
    });
  });
});
