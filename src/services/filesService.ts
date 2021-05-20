import db from "../../db/db.connection";
import config from "../../config";
import * as FilesRepo from "../repositories/filesRepo";
import { UploadedFile } from "express-fileupload";

export const fetchFile = async (
  fileId: number
): Promise<string | undefined> => {
  try {
    const { key } = await FilesRepo.getFile(db, fileId);
    const fileData = await FilesRepo.getS3File(key);

    return fileData.Body?.toString("base64");
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const createFile = async (
  songId: number,
  file: UploadedFile
): Promise<string> => {
  try {
    if (file.size > config.MAX_FILE_SIZE) {
      throw new Error("Error creating song. Size can't exceed 10MB");
    }
    if (file.mimetype !== "application/pdf") {
      throw new Error("Error creating song. File must be .pdf or .txt");
    }
    await FilesRepo.postFile(db, file.name, songId, null);
    const fileKey = await FilesRepo.postS3File(file.name, file.data);

    return fileKey;
  } catch (err) {
    console.log(err);
    throw new Error("uploadFiles error");
  }
};

export const deleteFile = async (fileId: number): Promise<string> => {
  try {
    const deletedFileKey = await FilesRepo.deleteFile(db, fileId);
    console.log(deletedFileKey);
    const deletedFile = await FilesRepo.deleteS3File(deletedFileKey);
    return deletedFile;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting file");
  }
};