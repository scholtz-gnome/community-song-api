import { Request, Response } from "express";
import * as SongsFileCollectionService from "../services/songsFileCollectionService";
import { UploadedFile } from "express-fileupload";

export const postSongsFileCollection = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  const fileCollection = req.files?.file as UploadedFile[];
  try {
    const fileKeys = await SongsFileCollectionService.createFileCollection(
      songId,
      fileCollection
    );

    return res
      .status(200)
      .json({ message: `${fileKeys.length} files created` });
  } catch (err) {
    console.log(err);
    throw new Error("createSongsFileCollection error");
  }
};
