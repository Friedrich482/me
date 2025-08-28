import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  DATABASE_URL: z.string().trim().min(1),
});

export type Env = z.infer<typeof envSchema>;
