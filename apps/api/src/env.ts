import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),

  DATABASE_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),

  ADMIN_DASHBOARD_URL: z.url(),
  WEB_APP_URL: z.url(),

  R2_ACCESS_KEY_ID: z.string().trim().min(1),
  R2_SECRET_ACCESS_KEY: z.string().trim().min(1),
  R2_BUCKET_NAME: z.string().trim().min(1),
  R2_ACCOUNT_ID: z.string().trim().min(1),
  R2_PUBLIC_DOMAIN: z.url(),
  R2_ENDPOINT: z.url(),
});

export type Env = z.infer<typeof envSchema>;
