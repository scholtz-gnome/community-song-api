import jwt from "jsonwebtoken";
import config from "../../config";
import db from "../../db/db.connection";
import { Request, Response, NextFunction } from "express";

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      config.JWT_SECRET || "",
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log(err);
          next();
        } else {
          let [user] = await db("user").select().where("id", decodedToken.id);
          res.setHeader("Authorization", `Bearer: ${token}`);
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};
