"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const app = app_1.newApp();
describe("Express app root url", () => {
    it("should return status code of 200 and Hello from the backend! text", () => {
        return supertest_1.default(app).get("/").expect(200, "Hello from the backend!");
    });
});
