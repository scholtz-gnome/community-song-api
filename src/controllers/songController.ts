import config from "../../config";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import aws from "aws-sdk";
import db from "../../db/db.connection";
import {
  getAllSongs,
  getOneSong,
  deleteOneSong,
  deleteOneFile,
  postOneSong,
  getOneFile,
} from "../repositories/songRepo";
import User from "../interfaces/User";

export const getSongs = async (_: Request, res: Response) => {
  try {
    const data = await getAllSongs(db);

    return res.status(200).json({
      success: true,
      message: "All songs retrieved",
      songs: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileSongs = async (req: Request, res: Response) => {
  const userEmail: string = req.params.email;
  try {
    const data = await getAllSongs(db);

    const userSongs = data.filter((song) => song.email === userEmail);
    return res.status(200).json(userSongs);
  } catch (err) {
    console.log(err);
  }
};

export const getSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const { title, artist, firstName, profilePic, email, url } =
      await getOneSong(db, songId);

    return res.status(200).json({
      title,
      artist,
      firstName,
      profilePic,
      email,
      url,
      success: true,
      message: `Song retrieved`,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Couldn't retrieve file" });
  }
};

export const getFile = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const { url } = await getOneSong(db, songId);

    if (!url) {
      throw new Error("No file found");
    }

    const file: aws.S3.GetObjectOutput = await getOneFile(url);

    return res.status(200).json({
      file: file.Body?.toString("base64"),
      success: true,
      message: `File retrieved`,
    });
  } catch (err) {
    console.log(err);
    return res.status(404);
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const songId: number = Number(req.params.id);
  try {
    const deletedSong = await deleteOneSong(db, songId);

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
  const songId = Number(req.params.id);
  try {
    const { url } = await getOneSong(db, songId);

    const s3 = new aws.S3();

    s3.deleteObject(
      {
        Bucket: "community-song-pdfs",
        Key: url || "",
      },
      async (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          await deleteOneFile(db, songId);

          console.log(`API: File '${url}' deleted`);
          return res.status(200).json({
            success: true,
            message: `File '${url}' deleted`,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const postSong = async (req: Request, res: Response) => {
  const title: string = req.body.title;
  const artist: string = req.body.artist;
  let userId: number | null = null;

  if (req.user) {
    const user = req.user as User;
    userId = user.id;
  }

  if (req.files === undefined || req.files === null) {
    try {
      const song = await postOneSong(db, title, artist, userId);

      return res
        .status(200)
        .json({ success: true, message: `Song ${song.title} created` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Your song couldn't be created, sorry.",
      });
    }
  }

  const file = req.files.file as UploadedFile;

  if (file.size > config.MAX_FILE_SIZE) {
    return res.status(413).json({
      success: false,
      message: "File size exceeded. Cannot exceed 10MB.",
    });
  } else if (
    file.mimetype === "text/plain" ||
    file.mimetype === "application/pdf"
  ) {
    try {
      const song = await postOneSong(db, title, artist, userId, file.name);

      const s3 = new aws.S3();

      s3.upload(
        {
          Bucket: "community-song-pdfs",
          Key: file.name,
          Body: file.data,
        },
        (err, data) => {
          if (err) {
            console.log("Error from S3: " + err);
            res.status(500).json({
              success: false,
              message: `There was an error uploading "${song.title}". Our fault!`,
            });
          } else {
            res.status(200).json({
              data,
              success: true,
              message: `File "${song.title}" uploaded successfully`,
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
