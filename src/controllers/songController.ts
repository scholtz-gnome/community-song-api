import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as SongService from "../services/songService";
import User from "../interfaces/User";
import NewSong from "../interfaces/NewSong";

export const getSongs = async (_: Request, res: Response) => {
  try {
    const allSongs = await SongService.fetchAllSongs();
    return res.status(200).json({
      success: true,
      message: "All songs retrieved",
      songs: allSongs,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileSongs = async (req: Request, res: Response) => {
  const email: string = req.params.email;
  try {
    const userSongs = await SongService.fetchUserSongs(email);
    return res.status(200).json(userSongs);
  } catch (err) {
    console.log(err);
  }
};

export const getSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const { title, artist, firstName, profilePic, email, url, id } =
      await SongService.fetchOneSong(songId);

    return res.status(200).json({
      id,
      title,
      artist,
      firstName,
      profilePic,
      email,
      url,
      success: true,
      message: `Song retrieved`,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Couldn't retrieve file" });
  }
};

export const getFile = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const file = await SongService.fetchFile(songId);

    return res.status(200).json({
      file,
      success: true,
      message: `File retrieved`,
    });
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const deletedSong = await SongService.deleteSong(songId);
    return res.status(200).json({
      success: true,
      message: `'${deletedSong.title}' deleted from database along with '${deletedSong.url}'`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  try {
    const url = await SongService.deleteFile(songId);

    return res.status(200).json({
      success: true,
      message: `File '${url}' deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postSong = async (req: Request, res: Response) => {
  const newSong: NewSong = {
    title: req.body.title,
    artist: req.body.artist,
    user: req.user as User,
    file: req.files?.file as UploadedFile,
  };

  const response = await SongService.postSong(newSong);

  if (response) {
    return res
      .status(200)
      .json({ success: true, message: `Song ${response.title} created` });
  } else {
    return res.status(500);
  }
};
