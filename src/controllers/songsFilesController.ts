import { Request, Response } from "express";
import * as SongFileService from "../services/songFileService";

export const getSongFiles = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  try {
    const fileBodies = await SongFileService.fetchSongFiles(songId);

    return res.status(200).json({
      success: true,
      message: `File bodies retrieved`,
      files: fileBodies,
    });
  } catch (err) {
    console.log(err);
    throw new Error("getSongFiles error");
  }
};

export const deleteSongFiles = async (req: Request, res: Response) => {
  // TODO: complete controller
  console.log(req.params.id);
  res.status(200).json({
    success: true,
    message: "You've made a DELETE request to the /songs/:id/files endpoint",
  });
};
