import { Request, Response } from "express";

export const getGoogleRedirect = (req: Request, res: Response) => {
  res.redirect("http://localhost:3000");
};

export const getUserDetails = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const getLogout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("http://localhost:3000");
};
