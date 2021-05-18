import { Router } from "express";
import * as FileController from "../controllers/fileController";

const fileRouter: Router = Router();

fileRouter.get("/:id", FileController.getFile);
fileRouter.delete("/:key", FileController.deleteFile);

export default fileRouter;
