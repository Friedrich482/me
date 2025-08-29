import { z } from "zod";

export const AddTagToPostDto = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  postId: z.ulid(),
});

export const FindAllTagsForPostDto = z.object({
  postSlug: z.string().min(1),
});

export const RemoveTagFromPost = z.object({
  tagSlug: z.string().min(1),
  postSlug: z.string().min(1),
});

export type AddTagToPostDtoType = z.infer<typeof AddTagToPostDto>;

export type FindAllTagsForPostDtoType = z.infer<
  typeof FindAllTagsForPostDto
> & { authorId: string };

export type RemoveTagFromPostDtoType = z.infer<typeof RemoveTagFromPost> & {
  authorId: string;
};
