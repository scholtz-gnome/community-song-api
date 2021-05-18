import { Router } from "express";
import * as SongsFilesController from "../controllers/songsFilesController";

const songsFilesRouter: Router = Router();

songsFilesRouter.get("/songs/:id/files", SongsFilesController.getSongFiles);
songsFilesRouter.delete(
  "/songs/:id/files",
  SongsFilesController.deleteSongFiles
);

export default songsFilesRouter;
