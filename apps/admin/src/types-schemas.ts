import { z } from "zod";

import {
  AddTagToPostDto,
  CreatePostDto,
  isoDateSchema,
  slugSchema,
} from "@repo/common/types-schemas";

import type { Inputs } from "./utils/trpc";

export const ParamsSchema = z.object({
  slug: slugSchema,
});

export const CreatePostSchema = z.object({
  post: CreatePostDto.omit({ slug: true }),
  tags: z.array(AddTagToPostDto.pick({ name: true })),
});

export const EditPostSchema = z.object({
  post: CreatePostDto.omit({ slug: true }).extend({
    publishedAt: isoDateSchema.nullable(),
  }),
  tags: z.array(AddTagToPostDto.pick({ name: true })),
});

export const LocalStoragePostDraftSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.object({ name: z.string() })),
});

export type Status = Inputs["posts"]["findAll"]["status"];

export type CreatePost = z.infer<typeof CreatePostSchema>;

export type EditPost = z.infer<typeof EditPostSchema>;
