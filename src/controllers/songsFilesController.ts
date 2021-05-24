import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as SongsFilesService from "../services/songsFilesService";

export const getSongsFiles = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  try {
    const fileBodies = await SongsFilesService.readSongsFiles(songId);

    return res.status(200).json({
      success: true,
      message: `All files of song retrieved`,
      files: fileBodies,
    });
  } catch (err) {
    console.log(err);
    throw new Error("getSongFiles error");
  }
};

export const postSongsFiles = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  const file = req.files?.file as UploadedFile;
  try {
    const fileKey = await SongsFilesService.createSongsFiles(songId, file);

    return res.status(200).json({
      success: true,
      message: `File '${fileKey}' created`,
    });
  } catch (err) {
    console.log(err);
    throw new Error("postSongsFile controller error");
  }
};
