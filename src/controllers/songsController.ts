import { Request, Response } from "express";
import * as SongsService from "../services/songsService";
import User from "../interfaces/User";
import NewSong from "../interfaces/NewSong";

export const getSongs = async (_: Request, res: Response) => {
  try {
    const songs = await SongsService.fetchAllSongs();
    return res.status(200).json({
      success: true,
      message: "All songs retrieved",
      songs,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const { id, title, artist } = await SongsService.fetchOneSong(songId);

    return res.status(200).json({
      success: true,
      message: `${title} retrieved`,
      song: {
        id,
        title,
        artist,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Couldn't retrieve file" });
  }
};

export const patchSong = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  const updatedSong = {
    title: req.body.title,
    artist: req.body.artist,
  };
  try {
    const song = await SongsService.patchSong(songId, updatedSong);

    return res.status(200).json({
      success: true,
      message: `${song.title} updated`,
      song,
    });
  } catch (err) {
    console.log(err);
    throw new Error("pathSong controller error");
  }
};

export const postSong = async (req: Request, res: Response) => {
  const newSong: NewSong = {
    title: req.body.title,
    artist: req.body.artist,
    user: req.user as User,
  };
  try {
    const createdSong = await SongsService.postSong(newSong);

    return res
      .status(200)
      .json({ success: true, message: `Song ${createdSong.title} created` });
  } catch (err) {
    console.log(err);
    throw new Error("postSong error");
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const deletedSong = await SongsService.deleteSong(songId);
    return res.status(200).json({
      success: true,
      message: `'${deletedSong.title}' deleted from database`,
    });
  } catch (err) {
    console.log(err);
  }
};
