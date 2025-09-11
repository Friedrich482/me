import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { posts } from "src/drizzle/schema";

import { Inject, Injectable } from "@nestjs/common";
import { TRPCError } from "@trpc/server";

import {
  CreatePostDtoType,
  DeletePostDtoType,
  FindAllPostsDtoType,
  FindAllPublishedPostsDtoType,
  FindPostDtoType,
  FindPublishedPostDto,
  UpdatePostDtoType,
} from "./posts.dto";

@Injectable()
export class PostsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,
  ) {}

  async create(createPostDto: CreatePostDtoType) {
    const { slug, title, authorId, content, status } = createPostDto;

    // check if a post with this slug already exists

    const [existingPostWithSameSlug] = await this.db
      .select()
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, slug)))
      .limit(1);

    if (existingPostWithSameSlug) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "This slug is already used",
      });
    }

    const [createdPost] = await this.db
      .insert(posts)
      .values({
        title,
        slug,
        content,
        status,
        authorId,
      })
      .returning({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
      });

    return createdPost;
  }

  async findAll(findAllPostsDto: FindAllPostsDtoType) {
    const { status, authorId } = findAllPostsDto;

    const postsFromDb = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
        publishDate: posts.publishedAt,
      })
      .from(posts)
      .where(
        status
          ? and(eq(posts.authorId, authorId), eq(posts.status, status))
          : eq(posts.authorId, authorId),
      );

    return postsFromDb;
  }

  async findAllPublished(
    findAllPublishedPostsDto: FindAllPublishedPostsDtoType,
  ) {
    const { status } = findAllPublishedPostsDto;

    const postsFromDb = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
        publishDate: posts.publishedAt,
      })
      .from(posts)
      .where(eq(posts.status, status));

    return postsFromDb;
  }

  async findPost(findPostDto: FindPostDtoType) {
    const { slug, authorId } = findPostDto;

    const [post] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
        publishDate: posts.publishedAt,
      })
      .from(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, slug)));

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    return post;
  }

  async findPublishedPost(findPublishedPostDto: FindPublishedPostDto) {
    const { slug } = findPublishedPostDto;

    const [post] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
        publishDate: posts.publishedAt,
      })
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.status, "published")));

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    return post;
  }

  async update(updatePostDto: UpdatePostDtoType) {
    const { slug, authorId, ...maybeFields } = updatePostDto;

    const setFields = Object.fromEntries(
      Object.entries(maybeFields).filter(([, value]) => value !== undefined),
    );
    if (Object.keys(setFields).length === 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You need to specify at least one field to update",
      });
    }

    const [updated] = await this.db
      .update(posts)
      .set(setFields)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, slug)))
      .returning({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
        publishedAt: posts.publishedAt,
      });

    if (!updated)
      throw new TRPCError({ message: "Post not found", code: "NOT_FOUND" });

    return updated;
  }

  async deletePost(DeletePostDto: DeletePostDtoType) {
    const { slug, authorId } = DeletePostDto;

    const [deletedPost] = await this.db
      .delete(posts)
      .where(and(eq(posts.authorId, authorId), eq(posts.slug, slug)))
      .returning({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
      });

    if (!deletedPost)
      throw new TRPCError({ message: "Post not found", code: "NOT_FOUND" });

    return deletedPost;
  }
}
