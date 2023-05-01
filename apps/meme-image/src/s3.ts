import { env } from "./env";
import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
});

export async function upload(fileName: string, blob: Buffer) {
  const uploadedImage = await s3
    .upload({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: blob,
    })
    .promise();
  const presignedGETURL = s3.getSignedUrl("getObject", {
    Bucket: uploadedImage.Bucket,
    Key: uploadedImage.Key,
    Expires: 100, //time to expire in seconds
  });
  return presignedGETURL;
}
