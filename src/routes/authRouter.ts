import express, { Router } from "express";
import {
  localLogin,
  getGoogleRedirect,
  getUserDetails,
  getLogout,
} from "../controllers/authController";
import passport from "passport";
import google from "./authStrategies/GoogleStrategy";
import local from "./authStrategies/LocalStrategy";
import { verify } from "../middleware/authMiddleware";

const authRouter: Router = Router();

authRouter.use(express.json());
passport.use(google);
passport.use(local);

authRouter.post(
  "/auth/login/local",
  verify,
  passport.authenticate("local"),
  localLogin
);
authRouter.get("/auth/login/google", passport.authenticate("google"));
authRouter.get(
  "/auth/google/redirect",
  passport.authenticate("/authgoogle"),
  getGoogleRedirect
);
authRouter.get("/auth/", getUserDetails);
authRouter.get("/auth/logout", getLogout);

export default authRouter;
