import db from "../../db/db.connection";
import * as FileRepo from "../repositories/fileRepo";
import * as SongRepo from "../repositories/songRepo";

export const fetchFile = async (
  songId: number
): Promise<string | undefined> => {
  try {
    const { url } = await SongRepo.getOneSong(db, songId);
    if (!url) {
      throw new Error("No file found");
    }

    const file = await FileRepo.getS3File(url);
    return file.Body?.toString("base64");
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const deleteFile = async (songId: number): Promise<string | null> => {
  try {
    const { url } = await SongRepo.getOneSong(db, songId);
    if (url) {
      await FileRepo.deleteS3File(url);
      await SongRepo.deleteSongURL(db, songId);
    }
    return url;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting file");
  }
};
