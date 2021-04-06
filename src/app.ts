import express, { Request, Response, Express } from "express";
import cors from "cors";
import songRouter from "./routes/songRouter";
import profileRouter from "./routes/profileRouter";

export function newApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: "https://community-song.herokuapp.com/",
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/songs", songRouter);
  app.use("/profile", profileRouter);

  app.get("/", (_, res: Response) => {
    res.send("Hello from the backend!");
  });

  return app;
}
