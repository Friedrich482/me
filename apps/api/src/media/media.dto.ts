import z from "zod";

export const CreateMediaDto = z.instanceof(FormData).transform((data) => {
  const file = data.get("file");
  const parsedPostId = z.string().parse(data.get("postId"));

  const postId = JSON.parse(parsedPostId);

  const schema = z.object({
    file: z.file(),
    postId: z.ulid().nullable(),
  });

  const parsedContent = schema.parse({ file, postId });

  return parsedContent;
});

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
