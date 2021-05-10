import db from "../../../db/db.connection";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

const local = new LocalStrategy.Strategy(
  {
    usernameField: "email",
  },
  async (username, password, done) => {
    try {
      const [selectedUser] = await db("user")
        .select(["id", "password"])
        .where("email", username);

      if (!selectedUser) {
        await bcrypt.genSalt(10, async (err, salt) => {
          if (err) {
            console.log(err);
          } else {
            await bcrypt.hash(password, salt, async (err, hash) => {
              if (err) {
                console.log(err);
              } else {
                const [newUser] = await db("user")
                  .returning(["id"])
                  .insert({
                    email: username,
                    password: hash,
                    first_name: username.split("@")[0],
                  });
                done(null, newUser);
              }
            });
          }
        });
      } else {
        await bcrypt.compare(password, selectedUser.password, (err, result) => {
          if (err) {
            console.log(err);
          } else if (!result) {
            done(null);
          } else {
            done(null, {
              id: selectedUser.id,
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export default local;
