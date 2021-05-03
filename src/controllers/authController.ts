import config from "../../config";
import { Request, Response } from "express";

export const getLogin = (req: Request, res: Response) => {
  res
    .status(200)
    .cookie("AuthorizationCookie", "userloggedin", {
      maxAge: 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: "communitysong.co.za",
    })
    .redirect(`${config.APP_URL_ROOT}`);
};

export const getLogout = (req: Request, res: Response) => {
  req.session.destroy(() => console.log("Session DESTROYED!"));
  res
    .status(200)
    .clearCookie("AuthorizationCookie")
    .clearCookie("connect.sid")
    .redirect(`${config.APP_URL_ROOT}`);
};
