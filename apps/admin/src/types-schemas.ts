import type { Path } from "react-hook-form";
import { z } from "zod";

import { SlugSchema } from "@repo/common/types-schemas";

export const ParamsSchema = z.object({
  slug: SlugSchema,
});

export type MinimalPost = { post: { content: string; title: string } };
export type MinimalTFieldName<T extends MinimalPost> = Extract<
  Exclude<Path<T>, "post">,
  "post.content"
>;
