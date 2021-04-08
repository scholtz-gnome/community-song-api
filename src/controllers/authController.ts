import { Request, Response } from "express";
import config from "../../config";

export const getGoogleRedirect = (req: Request, res: Response) => {
  // @ts-ignore
  console.log(req._passport);
  console.log(req.user);

  res.redirect(`${config.APP_URL_ROOT}`);
};

export const getUserDetails = (req: Request, res: Response) => {
  // @ts-ignore
  console.log(req._passport);
  console.log(req.user);
  res.status(200).json(req.user);
};

export const getLogout = (req: Request, res: Response) => {
  console.log(req);
  req.logout();
  res.redirect(`${config.APP_URL_ROOT}`);
};
