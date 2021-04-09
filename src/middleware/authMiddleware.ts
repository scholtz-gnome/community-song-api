import jwt from "jsonwebtoken";
import config from "../../config";
import db from "../../db/db.connection";
import { Request, Response, NextFunction } from "express";

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const cookieHeader = res.getHeader("Set-Cookie");
  console.log("checkUser = cookieHeader => ", cookieHeader);
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      config.JWT_SECRET || "",
      async (err: any, decodedToken: any) => {
        if (err) {
          res.locals.user = null;
          console.log(err);
          next();
        } else {
          let [user] = await db("user").select().where("id", decodedToken.id);
          console.log("checkUser Middleware => ", req.user);
          req.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};
