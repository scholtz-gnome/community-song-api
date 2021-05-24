import { Router } from "express";
import fileUpload from "express-fileupload";
import * as FilesController from "../controllers/filesController";

const filesRouter: Router = Router();

filesRouter.get("/files/:id", FilesController.getFile);
filesRouter.put("/files/:id", fileUpload(), FilesController.putFile);
filesRouter.delete("/files/:id", FilesController.deleteFile);

export default filesRouter;
