import request from "supertest";
import fs from "fs";
import { newApp } from "../src/app";
import { promisify } from "util";

const app = newApp();

describe("Upload a pdf", () => {
  const writeFile = promisify(fs.writeFile);
  const deleteFile = promisify(fs.unlink);

  const testFileName = "test.pdf";
  const testFilePath = `${__dirname}/testUploads/${testFileName}`;

  beforeAll(async () => writeFile(testFilePath, ""));
  afterAll(async () => deleteFile(testFilePath));

  it("uploads a pdf to the server directory testUploads/", () => {
    return request(app)
      .post("/song/upload")
      .attach("file", testFilePath)
      .expect((res) => {
        const { success, message, fileName, filePath } = res.body;
        expect(success).toBe(true);
        expect(message).toBe("Your file was uploaded successfully.");
        expect(fileName).toBe("testpdf");
        expect(filePath).toEqual(expect.stringContaining(fileName));
      });
  });
});
