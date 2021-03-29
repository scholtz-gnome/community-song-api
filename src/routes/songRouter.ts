import { Router } from "express";
import fileUpload from "express-fileupload";
import { getSongs, postSong } from "../controllers/songController";

const songRouter: Router = Router();

songRouter.get("/", getSongs);
songRouter.use(fileUpload({ debug: true }));
songRouter.post("/", postSong);

export default songRouter;
