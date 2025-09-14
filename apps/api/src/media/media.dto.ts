import z from "zod";

export const CreateMediaDto = z
  .object({
    file: z.file(),
    postId: z.ulid().nullable(),
  })
  .refine(({ file }) => file.type.startsWith("image/"));

export const UpdateMediaDto = z.object({
  filename: z.string().min(1),
  postId: z.ulid(),
});

export const DeleteMediaDto = z.object({
  filename: z.string().min(1),
  postId: z.ulid(),
});

export type CreateMediaDtoType = z.infer<typeof CreateMediaDto>;

export type UpdateMediaDtoType = z.infer<typeof UpdateMediaDto> & {
  authorId: string;
};

export type DeleteMediaDtoType = z.infer<typeof DeleteMediaDto> & {
  authorId: string;
};
