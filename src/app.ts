import config from "../config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import songsRouter from "./routes/songsRouter";
import communitiesRouter from "./routes/communitiesRouter";
import filesRouter from "./routes/filesRouter";
import authRouter from "./routes/authRouter";
import songsFilesRouter from "./routes/songsFilesRouter";
import songsFileCollectionRouter from "./routes/songsFileCollectionRouter";
import songsFileCollectionsRouter from "./routes/songsFileCollectionsRouter";
import compression from "compression";
import { checkUser } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";
import passport from "passport";
import csurf from "csurf";
import helmet from "helmet";
import enforce from "express-sslify";

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
if (config.NODE_ENV !== "test") {
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
}
app.use(checkUser);
app.use(passport.initialize());
app.use(passport.session());

app.use(filesRouter);
app.use(songsRouter);
app.use(songsFileCollectionRouter);
app.use(songsFileCollectionsRouter);
app.use(songsFilesRouter);
app.use(communitiesRouter);
app.use("/auth", authRouter);

export default app;
