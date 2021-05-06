import config from "../../config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const localLogin = (req: Request, res: Response) => {
  const user: any | undefined = req.user;
  const id: number = user.id;
  jwt.sign(
    { id },
    config.JWT_SECRET || "",
    {
      expiresIn: config.EIGHT_HOURS,
    },
    (err, token) => {
      if (err) {
        console.log(err);
      } else {
        return res
          .status(200)
          .cookie("jwt", token, {
            httpOnly: true,
            maxAge: config.EIGHT_HOURS * 1000,
            sameSite: "strict",
            secure: true,
            domain: `${config.ROOT_DOMAIN}`,
            path: "/",
          })
          .json({ redirect: `${config.APP_URL_ROOT}/profile` });
      }
    }
  );
};

export const getGoogleRedirect = (req: Request, res: Response) => {
  const user: any | undefined = req.user;
  const id: number = user.id;
  jwt.sign(
    { id },
    config.JWT_SECRET || "",
    {
      expiresIn: config.EIGHT_HOURS,
    },
    (err, token) => {
      if (err) {
        console.log(err);
      } else {
        return res
          .status(200)
          .cookie("jwt", token, {
            httpOnly: true,
            maxAge: config.EIGHT_HOURS * 1000,
            sameSite: "strict",
            secure: true,
            domain: `${config.ROOT_DOMAIN}`,
            path: "/",
          })
          .redirect(`${config.APP_URL_ROOT}/profile`);
      }
    }
  );
};

export const getUserDetails = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const getLogout = (_: Request, res: Response) => {
  res
    .clearCookie("jwt", { path: "/", domain: `${config.ROOT_DOMAIN}` })
    .redirect(`${config.APP_URL_ROOT}`);
};
