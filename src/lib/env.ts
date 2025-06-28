import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email(),
    NEXT_PUBLIC_VERCEL_MAX_UPLOAD_SIZE: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_VERCEL_MAX_UPLOAD_SIZE:
      process.env.NEXT_PUBLIC_VERCEL_MAX_UPLOAD_SIZE,
  },
  emptyStringAsUndefined: true,
  skipValidation: false,
});
