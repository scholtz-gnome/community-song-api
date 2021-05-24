import { Router } from "express";
import fileUpload from "express-fileupload";
import * as SongsFilesController from "../controllers/songsFilesController";

const songsFilesRouter: Router = Router();

songsFilesRouter.use(fileUpload());

songsFilesRouter.get("/songs/:id/files", SongsFilesController.getSongsFiles);
songsFilesRouter.post("/songs/:id/files", SongsFilesController.postSongsFiles);

export default songsFilesRouter;
