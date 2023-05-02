import AWS from "aws-sdk";
import { BufferResolvable } from "discord.js";

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export async function download(fileName: string) {
  console.log("Downloading...");
  try {
    const results = await s3
      .getObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
      })
      .promise();

    console.log("Download complete.");
    return results.Body as BufferResolvable;
  } catch (err) {
    console.log(err);
  }
}
