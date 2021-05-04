import passport from "passport";
import config from "../../../config";
import db from "../../../db/db.connection";
import LocalStrategy from "passport-local";

const local = new LocalStrategy.Strategy((username, password, done) => {});
