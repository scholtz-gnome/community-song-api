import db from "../../db/db.connection";
import config from "../../config";
import * as FilesRepo from "../repositories/filesRepo";
import { UploadedFile } from "express-fileupload";

export const fetchFile = async (
  fileId: number
): Promise<string | undefined> => {
  try {
    const key = await FilesRepo.getFile(db, fileId);
    const fileData = await FilesRepo.getS3File(key);

    return fileData.Body?.toString("base64");
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const updateFile = async (
  fileId: number,
  file: UploadedFile,
  oldKey: string
): Promise<string> => {
  try {
    if (file.size > config.MAX_FILE_SIZE) {
      throw new Error("Error creating song. Size can't exceed 10MB");
    }
    if (file.mimetype !== "application/pdf") {
      throw new Error("Error creating song. File must be .pdf or .txt");
    }
    const newKey = await FilesRepo.updateFile(db, file.name, fileId);
    await FilesRepo.deleteS3File(oldKey);
    await FilesRepo.createS3File(newKey, file.data);
    console.log(newKey);
    return newKey;
  } catch (err) {
    console.log(err);
    throw new Error("updateFile service error");
  }
};

export const deleteFile = async (fileId: number): Promise<string> => {
  try {
    const deletedFileKey = await FilesRepo.deleteFile(db, fileId);

    const deletedFile = await FilesRepo.deleteS3File(deletedFileKey);
    return deletedFile;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting file");
  }
};
