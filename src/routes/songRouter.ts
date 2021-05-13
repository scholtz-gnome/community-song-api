import express, { Router } from "express";
import fileUpload from "express-fileupload";
import * as SongController from "../controllers/songController";

const songRouter: Router = Router();

songRouter.use(express.json());
songRouter.use(fileUpload());
songRouter.get("/", SongController.getSongs);
songRouter.get("/:id", SongController.getSong);
songRouter.get("/profileSongs/:email", SongController.getProfileSongs);
songRouter.post("/", SongController.postSong);
songRouter.delete("/song/:id", SongController.deleteSong);

export default songRouter;
