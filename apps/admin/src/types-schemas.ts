import { z } from "zod";

import {
  AddTagToPostDto,
  CreatePostDto,
  slugSchema,
} from "@repo/common/types-schemas";

import type { Inputs } from "./utils/trpc";

export const ParamsSchema = z.object({
  slug: slugSchema,
});

export const CreatePostSchema = z.object({
  post: CreatePostDto,
  tags: z.array(AddTagToPostDto),
});

export type Status = Inputs["posts"]["findAll"]["status"];

export type CreatePost = z.infer<typeof CreatePostSchema>;
