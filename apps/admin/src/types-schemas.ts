import { z } from "zod";

import {
  AddTagToPostSchema,
  isoDateSchema,
  PostSchema,
  slugSchema,
} from "@repo/common/types-schemas";

import type { Inputs } from "./utils/trpc";

export const ParamsSchema = z.object({
  slug: slugSchema,
});

export const CreatePostFormSchema = z.object({
  post: PostSchema.omit({ slug: true }),
  tags: z.array(AddTagToPostSchema.pick({ name: true })),
});

export const EditPostFormSchema = z.object({
  post: PostSchema.omit({ slug: true }).extend({
    publishedAt: isoDateSchema.nullable(),
  }),
  tags: z.array(AddTagToPostSchema.pick({ name: true })),
});

export const LocalStoragePostDraftSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.object({ name: z.string() })),
});

export type Status = Inputs["posts"]["findAll"]["status"];

export type CreatePostFormType = z.infer<typeof CreatePostFormSchema>;

export type EditPostFormType = z.infer<typeof EditPostFormSchema>;
