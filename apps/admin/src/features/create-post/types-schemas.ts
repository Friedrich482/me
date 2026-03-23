import { z } from "zod";

import { AddTagToPostSchema, PostSchema } from "@repo/common/types-schemas";

export const LocalStoragePostDraftSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.object({ name: z.string() })),
});

export const CreatePostFormSchema = z.object({
  post: PostSchema.omit({ slug: true }),
  tags: z.array(AddTagToPostSchema.pick({ name: true })),
});

export type CreatePostFormType = z.infer<typeof CreatePostFormSchema>;
