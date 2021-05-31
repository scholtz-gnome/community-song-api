import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as SongsFileCollectionsService from "../services/songsFileCollectionsService";

export const postSongsFileCollections = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  const fileCollection = req.files?.file as UploadedFile[];
  const fileNames: string[] = req.body.fileNames;
  const fileTypes: string[] = req.body.types;
  try {
    await SongsFileCollectionsService.createSongsFileCollections(
      songId,
      fileCollection,
      fileNames,
      fileTypes
    );

    return res.status(200).json({
      success: true,
      message: "File-collection created",
    });
  } catch (err) {
    console.log(err);
    throw new Error("postSongsFileCollections controller error");
  }
};
