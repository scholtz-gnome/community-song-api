import { Router } from "express";
import { getSongs, postSong } from "../controllers/songController";
const songRouter: Router = Router();

songRouter.get("/", getSongs);
songRouter.post("/upload", postSong);

export default songRouter;
