import db from "../../../db/db.connection";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

const local = new LocalStrategy.Strategy(
  {
    usernameField: "email",
  },
  async (username, password, done) => {
    try {
      const [selectedUser] = await db("user").select().where("email", username);

      if (!selectedUser) {
        await bcrypt.genSalt(10, async (err, salt) => {
          if (err) {
            console.log(err);
          } else {
            await bcrypt.hash(password, salt, async (err, hash) => {
              if (err) {
                console.log(err);
              } else {
                const [newUser] = await db("user").returning(["*"]).insert({
                  email: username,
                  password: hash,
                });
                done(null, newUser);
              }
            });
          }
        });
      } else {
        bcrypt.compare(password, selectedUser.password, (err, result) => {
          if (!result) {
            console.log(err);
            done("Wrong password");
          } else {
            console.log(selectedUser);
            done(null, selectedUser);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export default local;
