import { Request, Response } from "express";
import * as FileService from "../services/fileService";

export const getFile = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const file = await FileService.fetchFile(songId);

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

export const deleteFile = async (req: Request, res: Response) => {
  const key = req.params.key;
  try {
    await FileService.deleteFile(key);

    return res.status(200).json({
      success: true,
      message: `File '${key}' deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};
