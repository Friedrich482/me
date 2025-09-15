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

export const FindAllMediaDto = z.object({
  postId: z.ulid().nullable(),
});

export const AttachMediaToPostDto = z.object({
  fileUrl: z.url(),
  postId: z.ulid(),
});

export const DeleteMediaDto = z.object({
  fileUrl: z.url(),
  postId: z.ulid(),
});

export type CreateMediaDtoType = z.infer<typeof CreateMediaDto>;

export type FindAllMediaDtoType = z.infer<typeof FindAllMediaDto> & {
  authorId: string;
};

export type AttachMediaToPostDtoType = z.infer<typeof AttachMediaToPostDto> & {
  authorId: string;
};

export type DeleteMediaDtoType = z.infer<typeof DeleteMediaDto> & {
  authorId: string;
};
