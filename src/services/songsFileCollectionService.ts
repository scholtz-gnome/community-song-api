import db from "../../db/db.connection";
import config from "../../config";
import { UploadedFile } from "express-fileupload";
import * as FilesRepo from "../repositories/filesRepo";
import * as SongsFilesRepo from "../repositories/songsFilesRepo";

export const updateSongsFileCollection = async (
  songId: number,
  fileCollection: UploadedFile[]
): Promise<string[]> => {
  try {
    const unresolvedPromise = fileCollection.map(async (file) => {
      if (file.size > config.MAX_FILE_SIZE) {
        throw new Error("Error creating song. Size can't exceed 10MB");
      }
      if (file.mimetype !== "application/pdf") {
        throw new Error("Error creating song. File must be .pdf or .txt");
      }
      await FilesRepo.createFile(db, file.name, songId, null);
      const fileKey = await FilesRepo.createS3File(file.name, file.data);

      return fileKey;
    });

    const fileKeys = await Promise.all(unresolvedPromise);

    return fileKeys;
  } catch (err) {
    console.log(err);
    throw new Error("createFileCollection error");
  }
};

export const deleteSongsFileCollection = async (songId: number) => {
  try {
    const deletedFiles = await SongsFilesRepo.deleteSongsFiles(db, songId);

    return deletedFiles;
  } catch (err) {
    console.log(err);
    throw new Error("deleteSongsFileCollection service error");
  }
};
