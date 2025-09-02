import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  DATABASE_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  ADMIN_DASHBOARD_URL: z.url(),
  WEB_APP_URL: z.url(),
});

export type Env = z.infer<typeof envSchema>;
