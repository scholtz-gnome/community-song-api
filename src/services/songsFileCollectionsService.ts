import db from "../../db/db.connection";
import config from "../../config";
import { UploadedFile } from "express-fileupload";
import * as FilesRepo from "../repositories/filesRepo";

export const createSongsFileCollections = async (
  songId: number,
  fileCollection: UploadedFile[],
  fileNames: string[],
  fileTypes: string[]
): Promise<string[]> => {
  try {
    const unresolvedPromise = fileCollection.map(async (file, i) => {
      if (file.size > config.MAX_FILE_SIZE) {
        throw new Error("Error creating song. Size can't exceed 10MB");
      }
      if (file.mimetype !== "application/pdf") {
        throw new Error("Error creating song. File must be .pdf or .txt");
      }
      await FilesRepo.createFile(db, fileNames[i], songId, fileTypes[i]);
      const fileKey = await FilesRepo.createS3File(fileNames[i], file.data);

      return fileKey;
    });

    const fileKeys = await Promise.all(unresolvedPromise);

    return fileKeys;
  } catch (err) {
    console.log(err);
    throw new Error("createFileCollection error");
  }
};
