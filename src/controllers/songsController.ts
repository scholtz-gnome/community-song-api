import { Request, Response } from "express";
import * as SongsService from "../services/songsService";
import User from "../interfaces/User";
import NewSong from "../interfaces/NewSong";

export const getSongs = async (_: Request, res: Response) => {
  try {
    const allSongs = await SongsService.fetchAllSongs();
    return res.status(200).json({
      success: true,
      message: "All songs retrieved",
      songs: allSongs,
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
      id,
      title,
      artist,
      success: true,
      message: `Song retrieved`,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Couldn't retrieve file" });
  }
};

export const getProfileSongs = async (req: Request, res: Response) => {
  const email: string = req.params.email;
  try {
    const userSongs = await SongsService.fetchUserSongs(email);
    return res.status(200).json(userSongs);
  } catch (err) {
    console.log(err);
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
