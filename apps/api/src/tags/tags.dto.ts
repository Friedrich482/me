import { z } from "zod";

import { slugSchema } from "@repo/common/types-schemas";

export const FindAllTagsForPostDto = z.object({
  postSlug: slugSchema,
});

export const FindAllTagsForPublishedPostDto = FindAllTagsForPostDto;

export const RemoveTagFromPostDto = z.object({
  tagSlug: slugSchema,
  postSlug: slugSchema,
});

export type FindAllTagsForPostDtoType = z.infer<
  typeof FindAllTagsForPostDto
> & { authorId: string };

export type FindAllTagsForPublishedPostDtoType = z.infer<
  typeof FindAllTagsForPublishedPostDto
>;

export type RemoveTagFromPostDtoType = z.infer<typeof RemoveTagFromPostDto> & {
  authorId: string;
};
