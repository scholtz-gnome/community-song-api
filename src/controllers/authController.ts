import config from "../../config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const maxAge = 24 * 60 * 60;

export const getGoogleRedirect = (req: Request, res: Response) => {
  const user: any | undefined = req.user;
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
        return res
          .status(200)
          .cookie("jwt", token, {
            maxAge: maxAge * 1000,
            sameSite: "none",
            secure: true,
            domain: "community-song-api.herokuapp.com",
            path: "/auth",
          })
          .cookie("test-cookie", "testtesttest", {
            maxAge: maxAge * 1000,
            sameSite: "none",
            secure: true,
          })
          .redirect(`${config.APP_URL_ROOT}`);
      }
    }
  );
};

export const getUserDetails = (req: Request, res: Response) => {
  res
    .status(200)
    .cookie("anothertest", "anotheranother", {
      maxAge: maxAge * 1000,
      sameSite: "none",
      secure: true,
    })
    .json(req.user);
};

export const getLogout = (_: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 }).redirect(`${config.APP_URL_ROOT}`);
};
