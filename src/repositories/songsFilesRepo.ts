import { Knex } from "knex";
import File from "../interfaces/File";

export const readSongsFiles = async (
  db: Knex,
  songId: number
): Promise<File[]> => {
  try {
    const files: File[] = await db("file")
      .returning(["key"])
      .where("file.song_id", songId)
      .select("key");

    return files;
  } catch (err) {
    console.log(err);
    throw new Error("getFile error");
  }
};

export const deleteSongsFiles = async (
  db: Knex,
  songId: number
): Promise<string[]> => {
  try {
    const files: File[] = await db("file")
      .returning(["key"])
      .where("id", songId)
      .del();

    const fileKeys = files.map((file) => file.key);

    return fileKeys;
  } catch (err) {
    console.log(err);
    throw new Error("deleteFile error");
  }
};
