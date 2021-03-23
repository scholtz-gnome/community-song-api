import express, { Request, Response, Express } from "express";
import cors from "cors";
import songRouter from "./routes/songRouter";

export function newApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/song", songRouter);

  app.get("/", (_, res: Response) => {
    res.send("Hello from the backend!");
  });

  return app;
}
