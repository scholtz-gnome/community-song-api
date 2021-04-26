import express, { Router } from "express";
import fileUpload from "express-fileupload";
import {
  getSongs,
  getSong,
  getProfileSongs,
  postSong,
  deleteSong,
  deleteFile,
} from "../controllers/songController";

const songRouter: Router = Router();

songRouter.use(express.json());
songRouter.use(fileUpload());
songRouter.get("/", getSongs);
songRouter.get("/:id", getSong);
songRouter.get("/profileSongs/:email", getProfileSongs);
songRouter.post("/", postSong);
songRouter.delete("/song/:id", deleteSong);
songRouter.delete("/file/:id", deleteFile);

export default songRouter;
