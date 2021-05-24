import express, { Router } from "express";
import fileUpload from "express-fileupload";
import * as SongsFileCollectionsController from "../controllers/songsFileCollectionsController";

const songsFileCollectionsRouter: Router = express.Router();

songsFileCollectionsRouter.post(
  "/songs/:id/file-collections",
  fileUpload(),
  SongsFileCollectionsController.postSongsFileCollections
);

export default songsFileCollectionsRouter;
