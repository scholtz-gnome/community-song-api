import request from "supertest";
import fs from "fs";
import { newApp } from "../src/app";
import { promisify } from "util";

const app = newApp();

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

const testFileName = "test.pdf";
const testFilePath = `${__dirname}/testUploads/${testFileName}`;

describe("Upload a pdf", () => {
  beforeEach(async () => {
    const bufferOne = Buffer.alloc(10);
    writeFile(testFilePath, bufferOne);
  });
  afterEach(async () => deleteFile(testFilePath));

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

describe("Upload a pdf", () => {
  beforeEach(async () => {
    const buffer = Buffer.alloc(20);
    writeFile(testFilePath, buffer);
  });
  afterEach(async () => deleteFile(testFilePath));

  it("responds with appropriate error messages", () => {
    return request(app)
      .post("/song/upload")
      .attach("file", testFilePath)
      .expect((res) => {
        const { success, message } = res.body;
        expect(success).toBe(false);
        expect(message).toBe("File size of 5MB is too big. Can't exceed 4MB.");
      });
  });
});
