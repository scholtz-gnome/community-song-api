import { Router } from "express";
import fileUpload from "express-fileupload";
import * as FilesController from "../controllers/filesController";

const filesRouter: Router = Router();

filesRouter.use(fileUpload());

filesRouter.get("/files/:id", FilesController.getFile);
filesRouter.post("/files", FilesController.postFile);
filesRouter.delete("/files/:id", FilesController.deleteFile);

export default filesRouter;
