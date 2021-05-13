import Song from "../interfaces/Song";
import { Knex } from "knex";
import aws from "aws-sdk";

export const getAllSongs = async (db: Knex): Promise<Song[]> => {
  const songs: Song[] = await db<Song>("file")
    .select(
      "title",
      "artist",
      "url",
      "first_name AS firstName",
      "email",
      "file.id"
    )
    .leftJoin("user", "file.user_id", "user.id");

  return songs;
};

export const getOneSong = async (db: Knex, songId: number): Promise<Song> => {
  const [song]: Song[] = await db<Song[]>("file")
    .where("file.id", songId)
    .select(
      "file.id AS id",
      "title",
      "artist",
      "url",
      "first_name AS firstName",
      "profile_pic AS profilePic",
      "email"
    )
    .leftJoin("user", "file.user_id", "user.id");

  return song;
};

export const postOneSong = async (
  db: Knex,
  title: string,
  artist: string,
  userId: number | null,
  url?: string
): Promise<Song> => {
  const [createdSong]: Song[] = await db("file").returning(["title"]).insert({
    title,
    artist,
    user_id: userId,
    url,
  });

  return createdSong;
};

export const deleteOneSong = async (
  db: Knex,
  songId: number
): Promise<Song> => {
  const [deletedSong]: Song[] = await db<Song>("file")
    .returning(["title", "url"])
    .where("id", songId)
    .del();

  return deletedSong;
};

export const deleteSongURL = async (
  db: Knex,
  songId: number
): Promise<Song> => {
  try {
    const [updatedSong]: Song[] = await db<Song[]>("file")
      .returning(["title"])
      .where("id", songId)
      .update("url", null);

    return updatedSong;
  } catch (err) {
    console.log(err);
    throw new Error("deleteOneFile failed");
  }
};

const s3 = new aws.S3();

export const getS3File = async (
  url: string
): Promise<aws.S3.GetObjectOutput> => {
  try {
    const file = await s3
      .getObject({ Bucket: "community-song-pdfs", Key: url })
      .promise();
    return file;
  } catch (err) {
    console.log(err);
    throw new Error("S3 getObject failed");
  }
};

export const postS3File = async (
  key: string,
  fileData: Buffer
): Promise<void> => {
  try {
    await s3
      .upload({ Bucket: "community-song-pdfs", Key: key, Body: fileData })
      .promise();
  } catch (err) {
    console.log(err);
    throw new Error("s3Upload error");
  }
};

export const deleteS3File = async (url: string): Promise<void> => {
  try {
    await s3
      .deleteObject({ Bucket: "community-song-pdfs", Key: url })
      .promise();
  } catch (err) {
    console.log(err);
    throw new Error("S3 deleteObject failed");
  }
};
