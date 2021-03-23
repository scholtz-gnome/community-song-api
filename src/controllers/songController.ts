import { Request, Response } from "express";
import db from "../../db/db.connection";
import { UploadedFile } from "express-fileupload";

export const getSongs = (req: Request, res: Response) => {
  // query db for all songs
  // console.log(db);
};

export const postSong = (req: Request, res: Response) => {
  if (req.files === undefined) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const song = req.files.file as UploadedFile;

  song.mv(
    `/Users/stephenscholtz/projects/community-song-api/uploads/${song.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(400);
      }

      res.json({ fileName: song.name, filePath: `/uploads/${song.name}` });
    }
  );
};
