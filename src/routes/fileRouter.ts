import { Router } from "express";
import * as FileController from "../controllers/fileController";

const fileRouter: Router = Router();

fileRouter.get("/:id", FileController.getFile);
fileRouter.delete("/:id", FileController.deleteFile);

export default fileRouter;
