import express, { Router } from "express";
import fileUpload from "express-fileupload";
import * as SongsController from "../controllers/songsController";

const songsRouter: Router = Router();

songsRouter.use(express.json());
songsRouter.use(fileUpload());

songsRouter.get("/songs", SongsController.getSongs);
songsRouter.get("songs/:id", SongsController.getSong);
songsRouter.get("/profileSongs/:email", SongsController.getProfileSongs);
songsRouter.post("/songs", SongsController.postSong);
songsRouter.delete("/songs/:id", SongsController.deleteSong);

export default songsRouter;
