import { Router } from "express";
import { getProfile, postLogin } from "../controllers/profileController";

const profileRouter: Router = Router();

profileRouter.get("/:email", getProfile);
profileRouter.post("/login", postLogin);

export default profileRouter;
