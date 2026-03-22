import { z } from "zod";

import { STATUS_ENUM } from "@repo/common/constants";
import {
  IsoStringSchema,
  PostSchema as CreatePostDto,
  SlugSchema,
} from "@repo/common/types-schemas";

const PublishedAtSchema = IsoStringSchema.transform((val) => new Date(val));

export const FindAllPostsDto = z.object({
  status: z.enum(STATUS_ENUM).optional(),
});

export const FindAllPublishedPostsDto = z.object({
  status: z.enum(STATUS_ENUM),
});

export const FindPostDto = z.object({
  slug: SlugSchema,
});

export const FindPublishedPostDto = FindPostDto;

export const UpdatePostDto = z.object({
  id: z.ulid(),
  title: z.string().min(1).optional(),
  slug: SlugSchema,
  content: z.string().min(1).optional(),
  status: z.enum(STATUS_ENUM).optional(),
  publishedAt: PublishedAtSchema.optional(),
});

export const DeletePostDto = z.object({
  slug: SlugSchema,
});

export const CheckPostExistDto = z.object({
  slug: SlugSchema,
});

export type CreatePostDtoType = z.infer<typeof CreatePostDto> & {
  authorId: string;
};

export type FindAllPostsDtoType = z.infer<typeof FindAllPostsDto> & {
  authorId: string;
};

export type FindAllPublishedPostsDtoType = z.infer<
  typeof FindAllPublishedPostsDto
>;

export type FindPostDtoType = z.infer<typeof FindPostDto> & {
  authorId: string;
};

export type FindPublishedPostDto = z.infer<typeof FindPublishedPostDto>;

export type UpdatePostDtoType = z.infer<typeof UpdatePostDto> & {
  authorId: string;
};

export type DeletePostDtoType = z.infer<typeof DeletePostDto> & {
  authorId: string;
};
export type CheckPostExistDtoType = z.infer<typeof CheckPostExistDto> & {
  authorId: string;
};
