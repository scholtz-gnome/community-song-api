import { Request, Response } from "express";
import db from "../../db/db.connection";

export const get_songs = (req: Request, res: Response) => {
  // query db for all songs
  // console.log(db);
};

export const post_song = (req: Request, res: Response) => {
  console.log(req.body);
};
