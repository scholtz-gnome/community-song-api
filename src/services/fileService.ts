import db from "../../db/db.connection";
import * as FileRepo from "../repositories/fileRepo";

export const fetchFile = async (
  songId: number
): Promise<string[] | undefined> => {
  try {
    const fileKeys: string[] = await FileRepo.getFilesOfSong(db, songId);

    const fileData = fileKeys.map(async (key): Promise<any> => {
      const data = await FileRepo.getS3File(key);
      return data.Body?.toString("base64");
    });

    const allData = await Promise.all(fileData);

    return allData;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const deleteFile = async (key: string): Promise<void> => {
  try {
    await FileRepo.deleteS3File(key);
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting file");
  }
};
