import db from "../../db/db.connection";
import * as SongRepo from "../repositories/songRepo";
import Song from "../interfaces/Song";
import NewSong from "../interfaces/NewSong";

export const fetchAllSongs = async (): Promise<Song[]> => {
  try {
    const allSongs = await SongRepo.getAllSongs(db);
    return allSongs;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching all songs");
  }
};

export const fetchUserSongs = async (email: string): Promise<Song[]> => {
  try {
    const allSongs = await SongRepo.getAllSongs(db);
    return allSongs.filter((song) => song.email === email);
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching user songs");
  }
};

export const fetchOneSong = async (songId: number): Promise<Song> => {
  try {
    const song = await SongRepo.getOneSong(db, songId);
    return song;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching one song");
  }
};

export const fetchFile = async (
  songId: number
): Promise<string | undefined> => {
  try {
    const { url } = await SongRepo.getOneSong(db, songId);
    if (!url) {
      throw new Error("No file found");
    }

    const file = await SongRepo.getS3File(url);
    return file.Body?.toString("base64");
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching file");
  }
};

export const deleteSong = async (songId: number): Promise<any> => {
  try {
    const { title, url } = await SongRepo.deleteOneSong(db, songId);
    const song = { title, url };
    if (url) {
      await SongRepo.deleteS3File(url);
    }
    return song;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting song");
  }
};

export const deleteFile = async (songId: number): Promise<string | null> => {
  try {
    const { url } = await SongRepo.getOneSong(db, songId);
    if (url) {
      await SongRepo.deleteS3File(url);
      await SongRepo.deleteSongURL(db, songId);
    }
    return url;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting file");
  }
};

export const postSong = async (newSong: NewSong): Promise<Song> => {
  try {
    if (newSong.file) {
      const title = await SongRepo.postOneSong(
        db,
        newSong.title,
        newSong.artist,
        newSong.user.id,
        newSong.file.name
      );

      await SongRepo.postS3File(newSong.file.name, newSong.file.data);

      return title;
    } else {
      const title = await SongRepo.postOneSong(
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
