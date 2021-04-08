import { Router } from "express";
import {
  getGoogleRedirect,
  getUserDetails,
  getLogout,
} from "../controllers/authController";
import passport from "passport";
import google from "./authStrategies/GoogleStrategy";

const authRouter: Router = Router();

passport.use(google);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  getGoogleRedirect
);

authRouter.get("/", getUserDetails);
authRouter.get("/logout", getLogout);

export default authRouter;
