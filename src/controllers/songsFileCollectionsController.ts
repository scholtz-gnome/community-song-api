import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import * as SongsFileCollectionsService from "../services/songsFileCollectionsService";

export const postSongsFileCollections = async (req: Request, res: Response) => {
  const songId = Number(req.params.id);
  const fileCollection = req.files?.file as UploadedFile[];
  try {
    const fileKeys =
      await SongsFileCollectionsService.createSongsFileCollections(
        songId,
        fileCollection
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
