import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import config from "../../config";
import aws from "aws-sdk";
import db from "../../db/db.connection";

export const getSongs = async (req: Request, res: Response) => {
  try {
    const dbData = await db("file")
      .select("title", "artist", "url", "first_name", "email", "file.id")
      .leftJoin("user", "file.user_id", "user.id");
    return res.status(200).json(dbData);
  } catch (err) {
    console.log(err);
  }
};

export const getProfileSongs = async (req: Request, res: Response) => {
  const userEmail = req.params.email;
  try {
    const allSongs = await db("file")
      .select("title", "artist", "url", "first_name", "email", "file.id")
      .leftJoin("user", "file.user_id", "user.id");

    const userSongs = allSongs.filter((song) => song.email === userEmail);
    res.status(200).json(userSongs);
  } catch (err) {
    console.log(err);
  }
};

export const getSong = async (req: Request, res: Response) => {
  try {
    const [song] = await db("file")
      .where("file.id", req.params.id)
      .select("title", "artist", "url", "first_name", "profile_pic")
      .leftJoin("user", "file.user_id", "user.id");

    const s3 = new aws.S3();

    s3.getObject(
      {
        Bucket: "community-song-pdfs",
        Key: song.url,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Can't fetch file" });
        } else {
          return res.status(200).json({
            title: song.title,
            artist: song.artist,
            first_name: song.first_name,
            profile_pic: song.profile_pic,
            file: data.Body?.toString("base64"),
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

interface DeletedSong {
  id: number;
  title: string;
  url: string;
}

export const deleteSong = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const [deletedSong]: DeletedSong[] = await db("file")
      .returning(["id", "title", "url"])
      .where("id", id)
      .del();

    const s3 = new aws.S3();

    s3.deleteObject(
      {
        Bucket: "community-song-pdfs",
        Key: deletedSong.url,
      },
      (err, data) =>
        err
          ? console.log(err)
          : console.log(
              `${deletedSong.url} deleted from community-song-pdfs bucket`
            )
    );

    res.status(200).json(deletedSong);
  } catch (err) {
    console.log(err);
  }
};

export const postSong = async (req: Request, res: Response) => {
  let user: any | undefined = req.user;

  if (req.files === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  let id: number | null;
  if (user !== undefined) {
    id = user.id;
  } else {
    id = null;
  }
  const title = req.body.title;
  const artist = req.body.artist;
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
        user_id: id,
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

    // song.mv(`${config.PROJECT_DIR}${song.name}`, (err) => {
    //   if (err) {
    //     return res.status(400).json({
    //       success: false,
    //       message: err,
    //     });
    //   }

    //   res.status(200).json({
    //     success: true,
    //     message: `${song.name} was successfully uploaded`,
    //     fileName: song.name,
    //     filePath: `${config.PROJECT_DIR}${song.name}`,
    //   });
    // });
  } else {
    return res.status(400).json({
      success: false,
      message: "Wrong file type. Must be .pdf or .txt",
    });
  }
};
