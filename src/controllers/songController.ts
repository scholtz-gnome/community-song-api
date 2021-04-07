import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import config from "../../config";
import aws from "aws-sdk";
import db from "../../db/db.connection";

export const getSongs = async (req: Request, res: Response) => {
  try {
    const dbData = await db.select("*").from("file");
    return res.status(200).json(dbData);
  } catch (err) {
    console.log(err);
  }
};

export const postSong = async (req: Request, res: Response) => {
  if (req.files === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const userId = Number(req.body.id);
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
