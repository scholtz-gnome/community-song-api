import { Request, Response } from "express";
import config from "../../config";
import jwt from "jsonwebtoken";

const maxAge = 24 * 60 * 60;
const createToken = (id: number) => {
  return jwt.sign({ id }, config.JWT_SECRET || "", {
    expiresIn: maxAge,
  });
};

export const getGoogleRedirect = (req: Request, res: Response) => {
  const user: any | undefined = req.user;
  console.log(req.user);
  const token = createToken(user.id);
  res
    .cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    })
    .redirect(`${config.APP_URL_ROOT}`);
};

export const getUserDetails = (req: Request, res: Response) => {
  console.log("getUserDetails => ", req.user);
  res.status(200).json(req.user);
};

export const getLogout = (_: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 }).redirect(`${config.APP_URL_ROOT}`);
};
