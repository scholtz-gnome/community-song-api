import { Router } from "express";
import { get_songs, post_song } from "../controllers/songController";
const songRouter: Router = Router();

songRouter.get("/", get_songs);
songRouter.post("/upload", post_song);

export default songRouter;
