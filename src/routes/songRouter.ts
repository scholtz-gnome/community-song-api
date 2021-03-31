import { Router } from "express";
import fileUpload from "express-fileupload";
import { getSongs, postSong } from "../controllers/songController";

const songRouter: Router = Router();

songRouter.get("/", getSongs);
songRouter.use(fileUpload());
songRouter.post("/", postSong);

export default songRouter;
