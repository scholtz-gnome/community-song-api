import { Router } from "express";
import fileUpload from "express-fileupload";
import { getSongs, postSong } from "../controllers/songController";
import { config } from "../../config";

const songRouter: Router = Router();

songRouter.get("/", getSongs);
songRouter.use(
  fileUpload({
    limits: { fileSize: config.MAX_FILE_SIZE },
    abortOnLimit: true,
    responseOnLimit: "File is too big. Max size is 50MB.",
  })
);
songRouter.post("/", postSong);

export default songRouter;
