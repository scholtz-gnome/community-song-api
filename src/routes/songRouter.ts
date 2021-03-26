import { Router } from "express";
import fileUpload from "express-fileupload";
import { getSongs, postSong } from "../controllers/songController";

const FIFTY_MEGABYTES = 50 * 1024 * 1024; // TODO extract to config

const songRouter: Router = Router();

songRouter.get("/", getSongs);
songRouter.use(fileUpload({ limits: { fileSize: FIFTY_MEGABYTES } }));
songRouter.post("/", postSong);

export default songRouter;
