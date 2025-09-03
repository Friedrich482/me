import { z } from "zod";

import { slugSchema } from "@repo/common/types-schemas";

import type { Inputs } from "./utils/trpc";

export const ParamsSchema = z.object({
  slug: slugSchema,
});

export type Status = Inputs["posts"]["findAll"]["status"];
