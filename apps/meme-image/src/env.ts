import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const env = z
  .object({
    AWS_S3_ACCESS_KEY_ID: z.string(),
    AWS_S3_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
  })
  .parse(process.env);
