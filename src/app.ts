import config from "../config";
import express, { Express } from "express";
import cors from "cors";
import songRouter from "./routes/songRouter";
import authRouter from "./routes/authRouter";
import compression from "compression";
import { checkUser } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";
import passport from "passport";

export function newApp(): Express {
  const app = express();

  app.use(compression());
  app.use(
    cors({
      origin: [`${config.APP_URL_ROOT}`],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(checkUser);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/songs", songRouter);
  app.use("/auth", authRouter);

  return app;
}
