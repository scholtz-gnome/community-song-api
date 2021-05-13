import config from "../config";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import songRouter from "./routes/songRouter";
import fileRouter from "./routes/fileRouter";
import authRouter from "./routes/authRouter";
import compression from "compression";
import { checkUser } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";
import passport from "passport";
import csurf from "csurf";
import helmet from "helmet";
import enforce from "express-sslify";

export function newApp(): Express {
  const app = express();

  app.use(helmet());
  if (config.NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }
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
  app.use(
    csurf({
      cookie: {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        domain: `${config.ROOT_DOMAIN}`,
        path: "/",
      },
    }),
    (req: Request, res: Response, next: NextFunction) => {
      res.cookie("CSRF-TOKEN", req.csrfToken(), {
        sameSite: "strict",
        secure: true,
        httpOnly: false,
        domain: `${config.ROOT_DOMAIN}`,
        path: "/",
      });
      next();
    }
  );
  app.use(checkUser);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/songs", songRouter);
  app.use("/files", fileRouter);
  app.use("/auth", authRouter);

  return app;
}
