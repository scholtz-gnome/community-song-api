import db from "../../db/db.connection";
import {
  getAllSongs,
  getOneSong,
  postOneSong,
  deleteOneSong,
  deleteSongURL,
  getS3File,
  postS3File,
  deleteS3File,
} from "../repositories/songRepo";
import Song from "../interfaces/Song";
import NewSong from "../interfaces/NewSong";

export const fetchAllSongsService = async (): Promise<Song[]> => {
  try {
    const allSongs = await getAllSongs(db);
    return allSongs;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching all songs");
  }
};

export const fetchUserSongsService = async (email: string): Promise<Song[]> => {
  try {
    const allSongs = await getAllSongs(db);
    return allSongs.filter((song) => song.email === email);
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching user songs");
  }
};

export const fetchOneSongService = async (songId: number): Promise<Song> => {
  try {
    const song = await getOneSong(db, songId);
    return song;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching one song");
  }
};

export const fetchFileService = async (
  songId: number
): Promise<string | undefined> => {
  try {
    const { url } = await getOneSong(db, songId);
    if (!url) {
      throw new Error("No file found");
    }

    const file = await getS3File(url);
    return file.Body?.toString("base64");
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const deleteSongService = async (songId: number): Promise<any> => {
  try {
    const { title, url } = await deleteOneSong(db, songId);
    const song = { title, url };
    if (url) {
      await deleteS3File(url);
      return song;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting song");
  }
};

export const deleteFileService = async (
  songId: number
): Promise<string | null> => {
  try {
    const { url } = await getOneSong(db, songId);
    if (url) {
      await deleteS3File(url);
      await deleteSongURL(db, songId);
    }
    return url;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting file");
  }
};

export const postSongService = async (newSong: NewSong): Promise<Song> => {
  try {
    if (newSong.file) {
      const title = await postOneSong(
        db,
        newSong.title,
        newSong.artist,
        newSong.user.id,
        newSong.file.name
      );

      await postS3File(newSong.file.name, newSong.file.data);

      return title;
    } else {
      const title = await postOneSong(
        db,
        newSong.title,
        newSong.artist,
        newSong.user.id
      );
      return title;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error posting new song");
  }
};
