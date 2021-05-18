import Song from "../interfaces/Song";
import { Knex } from "knex";

export const getAllSongs = async (db: Knex): Promise<Song[]> => {
  const songs: Song[] = await db<Song>("song")
    .select("title", "artist", "first_name AS firstName", "email", "song.id")
    .leftJoin("user", "song.added_by", "user.id");

  return songs;
};
// return song || null OR raise exception where it's not found
export const getOneSong = async (db: Knex, songId: number): Promise<any> => {
  const [song]: Song[] = await db<Song[]>("song")
    .where("song.id", songId)
    .select("id", "title", "artist")
    .limit(1);

  return song;
};

export const postOneSong = async (
  db: Knex,
  title: string,
  artist: string,
  userId: number | null
): Promise<Song> => {
  const [createdSong]: Song[] = await db("song")
    .returning(["title", "id"])
    .insert({
      title,
      artist,
      added_by: userId,
    });

  return createdSong;
};

export const deleteOneSong = async (
  db: Knex,
  songId: number
): Promise<Song> => {
  const [deletedSong]: Song[] = await db<Song>("song")
    .returning(["title"])
    .where("id", songId)
    .del();

  return deletedSong;
};
