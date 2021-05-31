import Song from "../interfaces/Song";
import { Knex } from "knex";

export const getAllSongs = async (db: Knex): Promise<Song[]> => {
  const songs: Song[] = await db<Song>("song")
    .select("title", "artist", "first_name AS firstName", "email", "song.id")
    .leftJoin("user", "song.added_by", "user.id");

  return songs;
};

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
  alternateTitle: string | null,
  artist: string,
  userId: number | null
): Promise<Song> => {
  const [createdSong]: Song[] = await db("song")
    .returning(["title", "id"])
    .insert({
      title,
      alternate_title: alternateTitle,
      artist,
      added_by: userId,
    });

  return createdSong;
};

export const updateSong = async (
  db: Knex,
  songId: number,
  updatedSong: {
    title: string;
    artist: string;
  }
): Promise<Song> => {
  try {
    const [song]: Song[] = await db("song")
      .returning(["id", "title", "artist"])
      .where("id", songId)
      .update({ title: updatedSong.title, artist: updatedSong.artist });

    return song;
  } catch (err) {
    console.log(err);
    throw new Error("updateSong repo error");
  }
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
