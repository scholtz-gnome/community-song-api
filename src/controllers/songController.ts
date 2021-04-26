import config from "../../config";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import aws from "aws-sdk";
import db from "../../db/db.connection";
import Song from "../interfaces/Song";
import User from "../interfaces/User";

export const getSongs = async (_: Request, res: Response) => {
  try {
    const allSongs: Song[] = await db("file")
      .select(
        "title",
        "artist",
        "url",
        "first_name AS firstName",
        "email",
        "file.id"
      )
      .leftJoin("user", "file.user_id", "user.id");
    return res.status(200).json({
      success: true,
      message: "All songs retrieved",
      songs: allSongs,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileSongs = async (req: Request, res: Response) => {
  const userEmail: string = req.params.email;
  try {
    const allSongs: Song[] = await db("file")
      .select(
        "title",
        "artist",
        "url",
        "first_name AS firstName",
        "email",
        "file.id"
      )
      .leftJoin("user", "file.user_id", "user.id");

    const userSongs = allSongs.filter((song) => song.email === userEmail);
    return res.status(200).json(userSongs);
  } catch (err) {
    console.log(err);
  }
};

export const getSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const [{ url, title, artist, firstName, profilePic, email, id }] = await db(
      "file"
    )
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

    if (url === null) {
      return res.json({
        id,
        title,
        artist,
        firstName,
        profilePic,
        email,
      });
    }

    const s3 = new aws.S3();

    s3.getObject(
      {
        Bucket: "community-song-pdfs",
        Key: url,
      },
      (err, data) => {
        if (err) {
          if (err.code === "NoSuchKey") {
            console.log(`Song with Key '${url} not found in S3 Bucket'`);
            return res.json({
              title,
              artist,
              firstName,
              profilePic,
              email,
            });
          }
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Can't fetch file" });
        } else {
          return res.status(200).json({
            id,
            title,
            artist,
            firstName,
            profilePic,
            email,
            file: data.Body?.toString("base64"),
            success: true,
            message: `Song ${title} retrieved`,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const songId: string = req.params.id;
  try {
    const [deletedSong]: Song[] = await db("file")
      .returning(["id", "title", "url"])
      .where("id", songId)
      .del();

    if (deletedSong.url === null) {
      console.log(`API: '${deletedSong.title}' deleted from database`);
      return res.status(200).json({
        success: true,
        message: `'${deletedSong.title}' deleted from database`,
      });
    }

    const s3 = new aws.S3();

    s3.deleteObject(
      {
        Bucket: "community-song-pdfs",
        Key: deletedSong.url,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          console.log(
            `API: '${deletedSong.title}' deleted from database along with '${deletedSong.url}'`
          );
          return res.status(200).json({
            success: true,
            message: `'${deletedSong.title}' deleted from database along with '${deletedSong.url}'`,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const songId = req.params.id;
  try {
    const [song]: Song[] = await db("file")
      .returning(["id", "title", "url"])
      .where("id", songId);

    const s3 = new aws.S3();

    s3.deleteObject(
      {
        Bucket: "community-song-pdfs",
        Key: song.url || "",
      },
      async (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          await db("file")
            .returning(["id", "title", "url"])
            .where("id", songId)
            .update("url", null);
          console.log(`API: File '${song.url}' deleted`);
          return res.status(200).json({
            success: true,
            message: `File '${song.url}' deleted`,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const postSong = async (req: Request, res: Response) => {
  let userId: number | null = null;
  if (req.user) {
    const user = req.user as User;
    userId = user.id;
  }
  const title: string = req.body.title;
  const artist: string = req.body.artist;

  if (req.files === undefined || req.files === null) {
    try {
      await db("file").insert({
        title,
        artist,
        user_id: userId,
      });

      return res
        .status(200)
        .json({ success: true, message: `Song ${title} created` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Your song couldn't be created, sorry.",
      });
    }
  }

  const song = req.files.file as UploadedFile;

  if (song.size > config.MAX_FILE_SIZE) {
    return res.status(413).json({
      success: false,
      message: "File size exceeded. Cannot exceed 10MB.",
    });
  } else if (
    song.mimetype === "text/plain" ||
    song.mimetype === "application/pdf"
  ) {
    try {
      await db("file").insert({
        title,
        artist,
        url: song.name,
        user_id: userId,
      });

      const s3 = new aws.S3();

      s3.upload(
        {
          Bucket: "community-song-pdfs",
          Key: song.name,
          Body: song.data,
        },
        (err, data) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: `There was an error uploading "${title}". Our fault!`,
            });
            console.log("Error from S3: " + err);
          } else {
            res.status(200).json({
              data,
              success: true,
              message: `File "${title}" uploaded successfully`,
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Wrong file type. Must be .pdf or .txt",
    });
  }
};
