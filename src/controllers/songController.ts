import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { config } from "../../config";
import aws from "aws-sdk";

export const getSongs = async (req: Request, res: Response) => {
  try {
    const s3 = new aws.S3();

    s3.listObjects(
      {
        Bucket: "community-song-pdfs",
      },
      (err, data) => {
        try {
          res.status(200).json({ data });
        } catch (error) {
          console.log("Error from S3: " + err);
          console.log("Error from server: " + error);
        }
      }
    );
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
              message: `There was an error uploading "${req.body.title}". Our fault!`,
            });
            console.log("Error from S3: " + err);
          } else {
            res.status(200).json({
              data,
              success: true,
              message: `File "${req.body.title}" uploaded successfully`,
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
