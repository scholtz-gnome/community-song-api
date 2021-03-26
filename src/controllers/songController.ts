import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { config } from "../../config";

export const getSongs = (req: Request, res: Response) => {
  // query db for all songs
};

export const postSong = (req: Request, res: Response) => {
  if (req.files === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const song = req.files.file as UploadedFile;

  song.mv(`${config.PROJECT_DIR}${song.name}`, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }

    res.status(200).json({
      success: true,
      message: `${song.name} was successfully uploaded`,
      fileName: song.name,
      filePath: `${config.PROJECT_DIR}${song.name}`,
    });
  });
};
