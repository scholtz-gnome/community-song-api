import Song from "../interfaces/Song";
import { Knex } from "knex";

export const getAllSongs = async (db: Knex): Promise<Song[]> => {
  const songs: Song[] = await db<Song>("file")
    .select(
      "title",
      "artist",
      "url",
      "first_name AS firstName",
      "email",
      "file.id"
    )
    .leftJoin("user", "file.user_id", "user.id");

  return songs;
};

export const getOneSong = async (db: Knex, songId: number): Promise<Song> => {
  const [song]: Song[] = await db<Song[]>("file")
    .where("file.id", songId)
    .select(
      "file.id AS id",
      "title",
      "artist",
      "url",
      "first_name AS firstName",
      "profile_pic AS profilePic",
      "email"
    )
    .leftJoin("user", "file.user_id", "user.id");

  return song;
};

export const deleteOneSong = async (
  db: Knex,
  songId: number
): Promise<Song> => {
  const [deletedSong]: Song[] = await db<Song>("file")
    .returning(["id", "title", "url"])
    .where("id", songId)
    .del();

  return deletedSong;
};

export const deleteOneFile = async (
  db: Knex,
  songId: number
): Promise<Song> => {
  const [deletedFile]: Song[] = await db<Song[]>("file")
    .returning(["title"])
    .where("id", songId)
    .update("url", null);

  return deletedFile;
};

export const postOneSong = async (
  db: Knex,
  title: string,
  artist: string,
  userId: number | null,
  url?: string
): Promise<Song> => {
  const [createdSong]: Song[] = await db("file").returning(["title"]).insert({
    title,
    artist,
    user_id: userId,
    url,
  });

  return createdSong;
};
