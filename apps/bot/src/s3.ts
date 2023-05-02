import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export async function download(fileName: string) {
  return s3.getObject(
    {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
    },
    (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    }
  );
}
