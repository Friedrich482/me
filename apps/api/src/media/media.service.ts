import { and, eq, isNull } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CloudflareService } from "src/cloudflare/cloudflare.service";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { media, posts } from "src/drizzle/schema";

import { Inject, Injectable } from "@nestjs/common";
import { TRPCError } from "@trpc/server";

import {
  AttachMediaToPostDtoType,
  CreateMediaDtoType,
  DeleteMediaDtoType,
  FindAllMediaDtoType,
} from "./media.dto";

@Injectable()
export class MediaService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,

    private readonly cloudflareService: CloudflareService,
  ) {}

  async create(createMediaDto: CreateMediaDtoType) {
    const { file, postId } = createMediaDto;

    const { filename, imageUrl, uploadedAt, mimeType } =
      await this.cloudflareService.uploadFileInBucket({ file });

    const [createdMedia] = await this.db
      .insert(media)
      .values({
        filename,
        originalFilename: file.name,
        path: filename.split("/")[0],
        url: imageUrl,
        size: file.size,
        postId,
        uploadedAt,
        mimeType,
      })
      .returning({
        url: media.url,
        filename: media.filename,
      });

    return createdMedia;
  }

  async findAll(findAllMediaDto: FindAllMediaDtoType) {
    const { postId } = findAllMediaDto;

    const mediasFromDb = await this.db
      .select({ filename: media.filename, url: media.url })
      .from(media)
      .where(postId !== null ? eq(media.postId, postId) : isNull(media.postId));

    return mediasFromDb;
  }

  async attachMediaToPost(attachMediaToPostDto: AttachMediaToPostDtoType) {
    const { fileUrl, postId, authorId } = attachMediaToPostDto;

    const [existingPost] = await this.db
      .select()
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.id, postId)));

    if (!existingPost) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    const [updatedMedia] = await this.db
      .update(media)
      .set({ postId })
      .where(eq(media.url, fileUrl))
      .returning({ filename: media.filename, url: media.url });

    if (!updatedMedia) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Media not found",
      });
    }

    return updatedMedia;
  }

  async delete(deleteMediaDto: DeleteMediaDtoType) {
    const { fileUrl, postId, authorId } = deleteMediaDto;

    const [existingPost] = await this.db
      .select()
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.id, postId)));

    if (!existingPost) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    const [existingMedia] = await this.db
      .select({
        filename: media.filename,
      })
      .from(media)
      .where(eq(media.url, fileUrl));

    if (!existingMedia) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Media not found" });
    }

    await this.cloudflareService.deleteFileFromBucket({
      filename: existingMedia.filename,
    });

    const [deletedMedia] = await this.db
      .delete(media)
      .where(eq(media.filename, existingMedia.filename))
      .returning({
        filename: media.filename,
      });

    if (!deletedMedia) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Media not found",
      });
    }

    return deleteMediaDto;
  }
}
