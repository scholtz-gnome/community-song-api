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
          req.user = user;
          const maxAge = 24 * 60 * 60;
          const id: number = user.id;
          jwt.sign(
            { id },
            config.JWT_SECRET || "",
            {
              expiresIn: maxAge,
            },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                console.log("getGoogleRedirect token => ", token);
                res
                  .cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                  })
                  .redirect(`${config.APP_URL_ROOT}`);
              }
            }
          );
          next();
        }
      }
    );
  } else {
    console.log("No token");
    next();
  }
};
