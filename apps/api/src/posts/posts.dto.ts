import { z } from "zod";
import { STATUS_ENUM } from "src/common/constants";

import { slugSchema } from "@repo/common/types-schemas";

const isoDateSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date string",
  })
  .transform((val) => new Date(val));

export const CreatePostDto = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  content: z.string().min(1),
  status: z.enum(STATUS_ENUM),
});

export const FindAllPostsDto = z.object({
  status: z.enum(STATUS_ENUM).optional(),
});

export const FindPostDto = z.object({
  slug: slugSchema,
});

export const UpdatePostDto = z.object({
  title: z.string().min(1).optional(),
  slug: slugSchema,
  content: z.string().min(1).optional(),
  status: z.enum(STATUS_ENUM).optional(),
  publishedAt: isoDateSchema.optional(),
});

export const DeletePostDto = z.object({
  slug: slugSchema,
});

export type CreatePostDtoType = z.infer<typeof CreatePostDto> & {
  authorId: string;
};

export type FindAllPostsDtoType = z.infer<typeof FindAllPostsDto>;

export type FindPostDtoType = z.infer<typeof FindPostDto>;

export type UpdatePostDtoType = z.infer<typeof UpdatePostDto> & {
  authorId: string;
};

export type DeletePostDtoType = z.infer<typeof DeletePostDto> & {
  authorId: string;
};
