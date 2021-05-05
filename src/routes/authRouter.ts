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

const authRouter: Router = Router();

authRouter.use(express.json());
passport.use(google);
passport.use(local);

authRouter.post("/login/local", passport.authenticate("local"), localLogin);
authRouter.get("/login/google", passport.authenticate("google"));
authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  getGoogleRedirect
);
authRouter.get("/", getUserDetails);
authRouter.get("/logout", getLogout);

export default authRouter;
