import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import config from "../../../config";
import db from "../../../db/db.connection";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const [user] = await db("user").select().where("id", id);
  done(null, user);
});

const google = new GoogleStrategy.Strategy(
  {
    clientID: config.GOOGLE_CLIENT_ID || "",
    clientSecret: config.GOOGLE_CLIENT_SECRET || "",
    callbackURL: `${config.API_ROOT_URL}/auth/google/redirect`,
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
      const { given_name, family_name, picture, email } = profile._json;
      const { provider, id } = profile;
      const [selectedUser] = await db.select().from("user").where("idp_id", id);

      if (!selectedUser) {
        const [newUser] = await db("user").returning(["*"]).insert({
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
