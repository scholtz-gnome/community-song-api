import express, { Request, Response, Express } from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import config from "../config";
import songRouter from "./routes/songRouter";
import profileRouter from "./routes/profileRouter";
import authRouter from "./routes/authRouter";

export function newApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://community-song.herokuapp.com/",
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [config.COOKIE_KEY || ""],
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/songs", songRouter);
  app.use("/profile", profileRouter);
  app.use("/auth", authRouter);

  return app;
}
