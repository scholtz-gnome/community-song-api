import { Router } from "express";
import * as FileController from "../controllers/fileController";

const fileRouter: Router = Router();

fileRouter.get("/files/:id", FileController.getFile);
fileRouter.delete("/files/:key", FileController.deleteFile);

export default fileRouter;
