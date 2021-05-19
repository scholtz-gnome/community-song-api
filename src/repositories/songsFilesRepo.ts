import { Knex } from "knex";
import File from "../interfaces/File";

export const getSongFiles = async (
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
