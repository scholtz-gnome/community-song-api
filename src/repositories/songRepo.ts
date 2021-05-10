import db from "../../db/db.connection";

export const allSongs = async () => {
  return await db("file")
    .select(
      "title",
      "artist",
      "url",
      "first_name AS firstName",
      "email",
      "file.id"
    )
    .leftJoin("user", "file.user_id", "user.id");
};
