import db from "../../db/db.connection";
import * as SongsFilesRepo from "../repositories/songsFilesRepo";
import * as FileRepo from "../repositories/fileRepo";

export const fetchSongFiles = async (
  songId: number
): Promise<string[] | undefined> => {
  try {
    const songFiles = await SongsFilesRepo.getSongFiles(db, songId);
    const songFileKeys = songFiles.map((file) => file.key);

    const unresolvedPromise = songFileKeys.map(async (key): Promise<any> => {
      const data = await FileRepo.getS3File(key);
      return data.Body?.toString("base64");
    });

    const fileBodies = await Promise.all(unresolvedPromise);

    return fileBodies;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};
