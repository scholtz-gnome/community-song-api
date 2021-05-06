import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import config from "../../../config";
import db from "../../../db/db.connection";

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: Function) => {
  const [user] = await db("user").select("id").where("id", id);
  done(null, user);
});

const google = new GoogleStrategy.Strategy(
  {
    clientID: config.GOOGLE_CLIENT_ID || "",
    clientSecret: config.GOOGLE_CLIENT_SECRET || "",
    callbackURL: `${config.API_ROOT_URL}/auth/google/redirect`,
    scope: ["profile", "email"],
  },
  async (accessToken: any, refreshToken: any, profile: any, done: Function) => {
    try {
      const { given_name, family_name, picture, email } = profile._json;
      const { provider, id } = profile;
      const [selectedUser] = await db("user").select("id").where("idp_id", id);

      if (!selectedUser) {
        const [newUser] = await db("user").returning(["id"]).insert({
          first_name: given_name,
          last_name: family_name,
          email: email,
          profile_pic: picture,
          identity_provider: provider,
          idp_id: id,
        });
        done(null, newUser);
      } else {
        done(null, selectedUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export default google;
