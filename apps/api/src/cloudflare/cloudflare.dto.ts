import { z } from "zod";

// for the moment we only allow images
export const GetUploadUrlDto = z
  .object({
    file: z.file(),
  })
  .refine(({ file }) => file.type.startsWith("image/"));

export const DeleteFileFromBucketDto = z.object({
  filename: z.string().min(1),
});

export type GetUploadUrlDtoType = z.infer<typeof GetUploadUrlDto>;

export type DeleteFileFromBucketDtoType = z.infer<
  typeof DeleteFileFromBucketDto
>;
