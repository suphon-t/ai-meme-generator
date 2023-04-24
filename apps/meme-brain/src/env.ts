import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const env = z
  .object({
    OPENAI_API_KEY: z.string(),
  })
  .parse(process.env);
