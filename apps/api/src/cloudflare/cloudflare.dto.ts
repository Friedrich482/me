import { z } from "zod";

export const GetUploadUrlDto = z.object({
  file: z.file(),
});

export const DeleteFileFromBucketDto = z.object({
  fileName: z.string().min(1),
});

export type GetUploadUrlDtoType = z.infer<typeof GetUploadUrlDto>;

export type DeleteFileFromBucketDtoType = z.infer<
  typeof DeleteFileFromBucketDto
>;
