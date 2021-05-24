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
    throw new Error("getFile controller error");
  }
};

export const putFile = async (req: Request, res: Response) => {
  const fileId = Number(req.params.id);
  const file = req.files?.file as UploadedFile;
  const oldKey = req.body.oldKey;
  try {
    const newKey = await FilesService.updateFile(fileId, file, oldKey);

    return res.status(200).json({
      success: true,
      message: `File updated to '${newKey}'`,
    });
  } catch (err) {
    console.log(err);
    throw new Error("putFile controller error");
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
    throw new Error("deleteFile controller error");
  }
};
