import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
