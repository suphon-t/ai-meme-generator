import AWS from "aws-sdk";
import fs from "fs";

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

    fs.writeFileSync(fileName, results.Body as Buffer);
    console.log("Download complete.");
  } catch (err) {
    console.log(err);
  }
}
