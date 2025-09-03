import { z } from "zod";

import type { Inputs } from "./utils/trpc";

export const ParamsSchema = z.object({
  slug: z.string().min(1),
});

export type Status = Inputs["posts"]["findAll"]["status"];
