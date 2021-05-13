import aws from "aws-sdk";

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
