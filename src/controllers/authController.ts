import { Request, Response } from "express";
import config from "../../config";
import jwt from "jsonwebtoken";

export const getGoogleRedirect = (req: Request, res: Response) => {
  const maxAge = 24 * 60 * 60;
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
        res
          .status(200)
          .cookie("jwt", token, {
            httpOnly: true,
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
  res.status(200).json(req.user);
};

export const getLogout = (_: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 }).redirect(`${config.APP_URL_ROOT}`);
};
