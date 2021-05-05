import config from "../../config";
import db from "../../db/db.connection";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../interfaces/User";

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      config.JWT_SECRET || "",
      async (err: any, decodedToken: any) => {
        if (err) {
          console.log("checkUser => ", err);
          next();
        } else {
          const [user]: User[] = await db("user")
            .select(
              "id",
              "first_name AS firstName",
              "last_name AS lastName",
              "email",
              "role",
              "profile_pic AS profilePic",
              "created_at AS createdAt"
            )
            .where("id", decodedToken.id);
          req.user = user;
          next();
        }
      }
    );
  } else {
    next();
  }
};
