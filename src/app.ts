import express, { Express } from "express";
import cors from "cors";
import passport from "passport";
import config from "../config";
import songRouter from "./routes/songRouter";
import profileRouter from "./routes/profileRouter";
import authRouter from "./routes/authRouter";
import { checkUser } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";

export function newApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: [`${config.APP_URL_ROOT}`],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(cookieParser());
  app.use(checkUser);

  app.use("/songs", songRouter);
  app.use("/profile", profileRouter);
  app.use("/auth", authRouter);

  return app;
}
