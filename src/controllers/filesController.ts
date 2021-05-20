import { Request, Response } from "express";
import * as FilesService from "../services/filesService";
import { UploadedFile } from "express-fileupload";

export const getFile = async (req: Request, res: Response) => {
  const fileId: number = Number(req.params.id);
  try {
    const fileBody = await FilesService.fetchFile(fileId);

    return res.status(200).json({
      fileBody,
      success: true,
      message: `File retrieved`,
    });
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
};

export const postFile = async (req: Request, res: Response) => {
  const songId = Number(req.body.songId);
  const file = req.files?.file as UploadedFile;
  try {
    const fileKey = await FilesService.createFile(songId, file);

    return res.status(200).json({ message: `File ${fileKey} created` });
  } catch (err) {
    console.log(err);
    throw new Error("postFile error");
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const fileId = Number(req.params.id);
  try {
    const deletedFile = await FilesService.deleteFile(fileId);

    return res.status(200).json({
      success: true,
      message: `File '${deletedFile}' deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};
