import request from "supertest";
import { newApp } from "../src/app";
import fs from "fs";

const app = newApp();

describe("Upload a pdf", () => {
  const testFilePath = `${__dirname}/testUploads/test.pdf`;

  it("uploads a pdf to the server directory uploads/", async () => {
    const res = await request(app)
      .post("/song/upload")
      .attach("file", testFilePath);
    const { success, message, fileName, filePath } = res.body;
    expect(success).toBe(true);
    expect(message).toBe("Your file was uploaded successfully.");
    expect(fileName).toBe("testpdf");
    expect(typeof filePath).toBeTruthy();

    /* -- another attempt --
    await fs.access(testFilePath, (err) => {
      if (err) {
        throw new Error(`${err}`);
      }
    });

    return
      .then((res) => {
        const { success, message, fileName, filePath } = res.body;
        expect(success).toBeTruthy();
        expect(message).toBe("Your file was uploaded successfully.");
        expect(fileName).toBe("testpdf");
        expect(typeof filePath).toBeTruthy();
      })
      .catch((err) => console.log(err));
      */
  });
});
