import db from "../../db/db.connection";
import { UploadedFile } from "express-fileupload";
import * as SongsFilesRepo from "../repositories/songsFilesRepo";
import * as FilesRepo from "../repositories/filesRepo";

export const readSongsFiles = async (
  songId: number
): Promise<string[] | undefined> => {
  try {
    const songFiles = await SongsFilesRepo.readSongsFiles(db, songId);
    const songFileKeys = songFiles.map((file) => file.key);

    const unresolvedPromise = songFileKeys.map(async (key): Promise<any> => {
      const data = await FilesRepo.getS3File(key);
      return data.Body?.toString("base64");
    });

    const fileBodies = await Promise.all(unresolvedPromise);

    return fileBodies;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const createSongsFiles = async (
  songId: number,
  file: UploadedFile
): Promise<string> => {
  try {
    const fileKey = await FilesRepo.createFile(db, file.name, songId, null);
    await FilesRepo.createS3File(fileKey, file.data);

    return fileKey;
  } catch (err) {
    console.log(err);
    throw new Error("postSongsFile service error");
  }
};
