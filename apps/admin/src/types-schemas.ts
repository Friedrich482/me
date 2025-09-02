import { z } from "zod";

export const ParamsSchema = z.object({
  slug: z.string().min(1),
});
