import { Router } from "express";
import fileUpload from "express-fileupload";
import * as SongsFileCollectionController from "../controllers/songsFileCollectionController";

const songsFileCollection: Router = Router();

songsFileCollection.use(fileUpload());

songsFileCollection.post(
  "/songs/:id/file-collection",
  SongsFileCollectionController.postSongsFileCollection
);

export default songsFileCollection;
