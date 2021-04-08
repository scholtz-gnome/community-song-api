import { Request, Response } from "express";
import config from "../../config";

export const getGoogleRedirect = (req: Request, res: Response) => {
  res.redirect(`${config.APP_URL_ROOT}`);
};

export const getUserDetails = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const getLogout = (req: Request, res: Response) => {
  req.logout();
  res.redirect(`${config.APP_URL_ROOT}`);
};
