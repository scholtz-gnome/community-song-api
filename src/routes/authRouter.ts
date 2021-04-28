import { Router } from "express";
import {
  getGoogleRedirect,
  getUserDetails,
  getLogout,
} from "../controllers/authController";
import passport from "passport";
import google from "./authStrategies/GoogleStrategy";
import { checkUser } from "../middleware/authMiddleware";
import cookieParser from "cookie-parser";

const authRouter: Router = Router();
authRouter.use(cookieParser());
authRouter.use(checkUser);
authRouter.use(passport.initialize());
authRouter.use(passport.session());
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
