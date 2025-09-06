import { z } from "zod";

import { slugSchema } from "@repo/common/types-schemas";

export const AddTagToPostDto = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  postId: z.ulid(),
});

export const FindAllTagsForPostDto = z.object({
  postSlug: slugSchema,
});

export const FindAllTagsForPublishedPost = FindAllTagsForPostDto;

export const RemoveTagFromPost = z.object({
  tagSlug: slugSchema,
  postSlug: slugSchema,
});

export type AddTagToPostDtoType = z.infer<typeof AddTagToPostDto>;

export type FindAllTagsForPostDtoType = z.infer<
  typeof FindAllTagsForPostDto
> & { authorId: string };

export type FindAllTagsForPublishedPost = z.infer<
  typeof FindAllTagsForPublishedPost
>;

export type RemoveTagFromPostDtoType = z.infer<typeof RemoveTagFromPost> & {
  authorId: string;
};
