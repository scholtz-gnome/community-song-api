import { Request, Response } from "express";
import db from "../../db/db.connection";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const [user] = await db
      .select("id")
      .from("user")
      .where("email", req.params.email);

    return res.status(200).json(user.id);
  } catch (err) {
    console.log(err);
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { given_name, family_name, email, picture } = req.body;

  try {
    const [userExists] = await db
      .select("id")
      .from("user")
      .where("email", email);

    if (userExists === undefined) {
      await db("user").insert({
        first_name: given_name,
        last_name: family_name,
        email: email,
        profile_pic: picture,
      });
      return res.status(200);
    }

    return res.status(304).json({ message: "Already logged in." });
  } catch (err) {
    console.log(err);
  }
};
