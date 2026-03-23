import { z } from "zod";

import { SlugSchema } from "@repo/common/types-schemas";

export const ParamsSchema = z.object({
  slug: SlugSchema,
});
