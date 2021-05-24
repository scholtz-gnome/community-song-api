import request from "supertest";
import db from "../../db/db.connection";
import app from "../../src/app";

describe("communitiesRouter", () => {
  const communitiesPath: string = "/communities";

  beforeAll(async () => {
    jest.setTimeout(15000);
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("GET", () => {
    describe("When there are no communities", () => {
      it("responds with status code: 200, success: true, message: 'All communities retrieved', communities: []", async () => {
        const res = await request(app).get(communitiesPath);

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "All communities retrieved",
          communities: [],
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("POST", () => {
    describe("When a community is created", () => {
      it("responds with status code: 200, message: 'Super Band community created'", async () => {
        const res = await request(app).post(communitiesPath).send({
          name: "Super Band",
          about:
            "We're so super. We can all fly and we sing about saving cities from monsters and stuff",
          type: "band",
        });

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "Super Band community created",
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("GET", () => {
    describe("When community of given id is requested", () => {
      it("responds with status code: 200, success: true, message: 'Super Band community retrieved' and community object", async () => {
        const res = await request(app).get(`${communitiesPath}/1`);

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "Super Band community retrieved",
          community: {
            id: 1,
            name: "Super Band",
            about:
              "We're so super. We can all fly and we sing about saving cities from monsters and stuff",
            type: "band",
          },
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("PATCH", () => {
    describe("When community of given id is updated", () => {
      it("responds with status code: 200, success: true, message: 'Community updated'", async () => {
        const res = await request(app).patch(`${communitiesPath}/1`).send({
          name: "Not So Super Band",
          about:
            "We figured, it's actually kind difficult defeatig monstors so now we just watch Netflix all day",
        });

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "Community updated",
          updatedCommunity: {
            id: 1,
            name: "Not So Super Band",
            about:
              "We figured, it's actually kind difficult defeatig monstors so now we just watch Netflix all day",
            type: "band",
          },
        });
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE", () => {
    describe("When community of given id is deleted", () => {
      it("responds with status code: 200, success: true, message: 'Super Band community deleted'", async () => {
        const res = await request(app).delete(`${communitiesPath}/1`);

        expect(JSON.parse(res.text)).toEqual({
          success: true,
          message: "Not So Super Band community deleted",
        });
        expect(res.status).toBe(200);
      });
    });
  });
});
