import { Request, Response } from "express";
import db from "../../db/db.connection";
import { UploadedFile } from "express-fileupload";

export const getSongs = (req: Request, res: Response) => {
  // query db for all songs
  // console.log(db);
};

export const postSong = (req: Request, res: Response) => {
  if (req.files === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const song = req.files.file as UploadedFile;

  if (song.size <= 10) {
    song.mv(
      `/Users/stephenscholtz/projects/community-song-api/uploads/${song.name}`,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({
            success: false,
            message: "Your file upload was unsuccesful.",
          });
        }

        res.json({
          success: true,
          message: "Your file was uploaded successfully.",
          fileName: song.name,
          filePath: `/uploads/${song.name}`,
        });
      }
    );
  } else {
    res.status(400).json({
      success: false,
      message: "File size of 5MB is too big. Can't exceed 4MB.",
    });
  }
};
