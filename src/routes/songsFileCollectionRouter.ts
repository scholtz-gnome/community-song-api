import express, { Router } from "express";
import fileUpload from "express-fileupload";
import * as SongsFileCollectionController from "../controllers/songsFileCollectionController";

const songsFileCollectionRouter: Router = express.Router();

songsFileCollectionRouter.patch(
  "/songs/:id/file-collection",
  fileUpload(),
  SongsFileCollectionController.patchSongsFileCollection
);
songsFileCollectionRouter.delete(
  "/songs/:id/file-collection",
  SongsFileCollectionController.deleteSongsFileCollection
);

export default songsFileCollectionRouter;
