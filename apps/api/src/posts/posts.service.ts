import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { posts } from "src/drizzle/schema";

import {
  CreatePostDtoType,
  DeletePostDtoType,
  FindAllPostsDtoType,
  FindPostDtoType,
  UpdatePostDtoType,
} from "./posts.dto";

@Injectable()
export class PostsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,
  ) {}

  async create(CreatePostDto: CreatePostDtoType) {
    const { slug, title, authorId, content, status } = CreatePostDto;

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

  async findAll(FindAllPostsDto: FindAllPostsDtoType) {
    const { status, authorId } = FindAllPostsDto;

    const postsFromDb = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
      })
      .from(posts)
      .where(
        status
          ? and(eq(posts.authorId, authorId), eq(posts.status, status))
          : eq(posts.authorId, authorId),
      );

    return postsFromDb;
  }

  async findPost(FindPostDto: FindPostDtoType) {
    const { slug, authorId } = FindPostDto;

    const [post] = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        status: posts.status,
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

  async update(UpdatePostDto: UpdatePostDtoType) {
    const { slug, authorId, ...maybeFields } = UpdatePostDto;

    const setFields = Object.fromEntries(
      Object.entries(maybeFields).filter(([, value]) => value !== undefined),
    );
    if (Object.keys(setFields).length === 0) {
      throw new BadRequestException(
        "You need to specify at least one field to update",
      );
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
      });

    if (!updated) throw new NotFoundException("Post not found");

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

    if (!deletedPost) throw new NotFoundException("Post not found");

    return deletedPost;
  }
}
