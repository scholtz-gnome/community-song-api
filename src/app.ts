import express, { Request, Response, Express } from "express";
import cors from "cors";

export function newApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: "https://community-song.herokuapp.com/",
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_, res: Response) => {
    res.send("Hello from the backend!");
  });

  return app;
}
