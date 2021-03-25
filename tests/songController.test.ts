import request from "supertest";
import { newApp } from "../src/app";
import fs from "fs";

const app = newApp();

describe("Upload a pdf", async () => {
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

const fileName = 'test.pdf';
const filePath = `${__dirname}/testUploads/${fileName}`;

beforeAll(async () => writeFile(filePath, ''));
afterAll(async() => deleteFile(filePath));

  it("uploads a pdf to the server directory uploads/", async () => {
    const res = await request(app)
      .post("/song/upload")
      .attach("file", testFilePath);
    const { success, message, fileName, filePath } = res.body;
    expect(success).toBe(true);
    expect(message).toBe("Your file was uploaded successfully.");
    expect(fileName).toBe("testpdf");
    expect(filePath).stringContaining(fileName);
  });
});
