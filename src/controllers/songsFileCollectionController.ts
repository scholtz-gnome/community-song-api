import { Request, Response } from "express";
import * as SongsFileCollectionService from "../services/songsFileCollectionService";
import { UploadedFile } from "express-fileupload";

export const patchSongsFileCollection = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  const fileCollection = req.files?.file as UploadedFile[];
  const fileNames: string[] = req.body.fileNames;
  const fileTypes: string[] = req.body.types;
  try {
    await SongsFileCollectionService.updateSongsFileCollection(
      songId,
      fileCollection,
      fileNames,
      fileTypes
    );

    return res
      .status(200)
      .json({ success: true, message: `File-collection updated` });
  } catch (err) {
    console.log(err);
    throw new Error("createSongsFileCollection error");
  }
};

export const deleteSongsFileCollection = async (
  req: Request,
  res: Response
) => {
  const songId: number = Number(req.params.id);
  try {
    const deletedFiles =
      await SongsFileCollectionService.deleteSongsFileCollection(songId);

    res.status(200).json({ success: true, message: `File-collection deleted` });
  } catch (err) {
    console.log(err);
    throw new Error("deleteSongsFileCollection controller error");
  }
};
