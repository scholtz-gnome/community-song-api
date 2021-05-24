import aws from "aws-sdk";
import { Knex } from "knex";
import File from "../interfaces/File";

const s3 = new aws.S3();

export const getFile = async (db: Knex, fileId: number): Promise<string> => {
  try {
    const [file]: File[] = await db("file").where("id", fileId).select("key");
    return file.key;
  } catch (err) {
    console.log(err);
    throw new Error("getFile error");
  }
};

// TODO: remove getFilesOfSong as it's under the songsFilesRepo now
export const getFilesOfSong = async (
  db: Knex,
  songId: number
): Promise<string[]> => {
  try {
    const files: File[] = await db("file")
      .returning(["key"])
      .where("file.song_id", songId)
      .select("key");

    const fileKeys = files.map((file) => file.key);

    return fileKeys;
  } catch (err) {
    console.log(err);
    throw new Error("getFile error");
  }
};

export const getS3File = async (
  key: string
): Promise<aws.S3.GetObjectOutput> => {
  try {
    const file = await s3
      .getObject({
        Bucket: "community-song-pdfs",
        Key: key,
      })
      .promise();

    return file;
  } catch (err) {
    console.log(err);
    throw new Error("S3 getObject failed");
  }
};

export const createFile = async (
  db: Knex,
  key: string,
  songId: number,
  type: string | null
): Promise<string> => {
  try {
    const [fileKey]: string = await db("file")
      .returning("key")
      .insert({ key, song_id: songId, type });

    return fileKey;
  } catch (err) {
    console.log(err);
    throw new Error("createFile error");
  }
};

export const createS3File = async (
  key: string,
  fileData: Buffer
): Promise<string> => {
  try {
    await s3
      .upload({ Bucket: "community-song-pdfs", Key: key, Body: fileData })
      .promise();
    return key;
  } catch (err) {
    console.log(err);
    throw new Error("s3Upload error");
  }
};

export const updateFile = async (
  db: Knex,
  key: string,
  fileId: number
): Promise<string> => {
  try {
    const [fileKey]: string = await db("file")
      .returning("key")
      .where("id", fileId)
      .update({ key });

    return fileKey;
  } catch (err) {
    console.log(err);
    throw new Error("replaceFile repo error");
  }
};

export const deleteFile = async (db: Knex, fileId: number): Promise<string> => {
  try {
    const [fileKey]: string = await db("file")
      .returning("key")
      .where("id", fileId)
      .del();

    return fileKey;
  } catch (err) {
    console.log(err);
    throw new Error("deleteFile error");
  }
};

export const deleteS3File = async (key: string): Promise<string> => {
  try {
    await s3
      .deleteObject({ Bucket: "community-song-pdfs", Key: key })
      .promise();
    return key;
  } catch (err) {
    console.log(err);
    throw new Error("S3 deleteObject failed");
  }
};
