import { z } from "zod";

import {
  AddTagToPostSchema,
  IsoStringSchema,
  PostSchema,
} from "@repo/common/types-schemas";

export const EditPostFormSchema = z.object({
  post: PostSchema.omit({ slug: true }).extend({
    publishedAt: IsoStringSchema.nullable(),
  }),
  tags: z.array(AddTagToPostSchema.pick({ name: true })),
});

export type EditPostFormType = z.infer<typeof EditPostFormSchema>;
