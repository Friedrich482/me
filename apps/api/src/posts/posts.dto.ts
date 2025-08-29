import { STATUS_ENUM } from "src/common/constants";
import { z } from "zod";

export const CreatePostDto = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  status: z.enum(STATUS_ENUM),
});

export const FindAllPostsDto = z.object({
  status: z.enum(STATUS_ENUM).optional(),
});

export const FindPostDto = z.object({
  slug: z.string().min(1),
});

export const UpdatePostDto = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1),
  content: z.string().min(1).optional(),
  status: z.enum(STATUS_ENUM).optional(),
});

export const DeletePostDto = z.object({
  slug: z.string().min(1),
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
