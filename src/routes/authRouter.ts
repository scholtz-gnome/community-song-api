import { Router } from "express";
import { getLogin, getLogout } from "../controllers/authController";
import session from "express-session";
import KnexSessionStore, { StoreFactory } from "connect-session-knex";
import db from "../../db/db.connection";
import config from "../../config";

const authRouter: Router = Router();
const knexStore: StoreFactory = KnexSessionStore(session);

const sessionStore = new knexStore({
  //@ts-ignore
  knex: db,
});

authRouter.use(
  session({
    secret: config.SESSION_SECRET || "",
    store: sessionStore,
    unset: "destroy",
    cookie: {
      maxAge: 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: "communitysong.co.za",
    },
    resave: false,
    saveUninitialized: true,
  })
);

authRouter.get("/login", getLogin);
authRouter.get("/logout", getLogout);

export default authRouter;
