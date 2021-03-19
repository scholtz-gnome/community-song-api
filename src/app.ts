import express, { Request, Response, Express } from "express";
import cors from "cors";

export function newApp(): Express {
  const app = express();

  app.use(cors());
  app.use(function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://community-song.herokuapp.com/"
    );
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_, res: Response) => {
    res.send("Hello from the backend!");
  });

  return app;
}
