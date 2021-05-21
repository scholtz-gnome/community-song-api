import express, { Router } from "express";
import * as SongsController from "../controllers/songsController";

const songsRouter: Router = Router();

songsRouter.use(express.json());

songsRouter.get("/songs", SongsController.getSongs);
songsRouter.get("/songs/:id", SongsController.getSong);
songsRouter.post("/songs", SongsController.postSong);
songsRouter.patch("/songs/:id", SongsController.patchSong);
songsRouter.delete("/songs/:id", SongsController.deleteSong);

export default songsRouter;
