import request from "supertest";
import { newApp } from "../src/app";

const app = newApp();

describe("Express app root url", () => {
  it("should return status code of 200 and Hello from the backend! text", () => {
    return request(app).get("/").expect(200, "Hello from the backend!");
  });
});
