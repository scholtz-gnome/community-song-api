import db from "../../db/db.connection";
import * as SongRepo from "../repositories/songRepo";
import * as FilesRepo from "../repositories/filesRepo";
import * as SongsFilesRepo from "../repositories/songsFilesRepo";
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
    const song: Song = await SongRepo.getOneSong(db, songId);
    return song;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching one song");
  }
};

export const postSong = async (newSong: NewSong): Promise<Song> => {
  try {
    if (!newSong.user) {
      const createdSong = await SongRepo.postOneSong(
        db,
        newSong.title,
        newSong.alternateTitle,
        newSong.artist,
        null
      );

      return createdSong;
    } else {
      const createdSong = await SongRepo.postOneSong(
        db,
        newSong.title,
        newSong.alternateTitle,
        newSong.artist,
        newSong.user.id
      );

      return createdSong;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error posting new song");
  }
};

export const patchSong = async (
  songId: number,
  updatedSong: {
    title: string;
    artist: string;
  }
): Promise<Song> => {
  try {
    const song = await SongRepo.updateSong(db, songId, updatedSong);

    return song;
  } catch (err) {
    console.log(err);
    throw new Error("patchSong service error");
  }
};

export const deleteSong = async (
  songId: number
): Promise<{ title: string }> => {
  try {
    const { title } = await SongRepo.deleteOneSong(db, songId);
    const fileKeys: string[] = await SongsFilesRepo.deleteSongsFiles(
      db,
      songId
    );

    if (fileKeys !== []) {
      fileKeys.forEach(async (key) => {
        await FilesRepo.deleteS3File(key);
      });
    }

    const song = {
      title,
    };
    return song;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting song");
  }
};
