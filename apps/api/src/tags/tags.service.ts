import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { postTags, tags } from "src/drizzle/schema";
import { PostsService } from "src/posts/posts.service";

import {
  AddTagToPostDtoType,
  FindAllTagsForPostDtoType,
  RemoveTagFromPostDtoType,
} from "./tags.dto";

@Injectable()
export class TagsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,
    private readonly postsService: PostsService,
  ) {}

  async addTagToPost(addTagToPostDto: AddTagToPostDtoType) {
    const { name, slug, postId } = addTagToPostDto;

    const [existingTag] = await this.db
      .select({ id: tags.id })
      .from(tags)
      .where(eq(tags.slug, slug));

    if (!existingTag) {
      const [createdTag] = await this.db
        .insert(tags)
        .values({
          slug,
          name,
        })
        .returning({
          id: tags.id,
        });

      await this.db.insert(postTags).values({
        tagId: createdTag.id,
        postId: postId,
      });

      return;
    }

    const [existingRelation] = await this.db
      .select()
      .from(postTags)
      .where(
        and(eq(postTags.tagId, existingTag.id), eq(postTags.postId, postId)),
      );

    if (existingRelation) {
      throw new ConflictException("This tag is already linked to that post");
    }

    await this.db.insert(postTags).values({
      postId,
      tagId: existingTag.id,
    });

    return;
  }

  async findAllTagsForPost(findAllTagsForPostDto: FindAllTagsForPostDtoType) {
    const { postSlug, authorId } = findAllTagsForPostDto;

    const post = await this.postsService.findPost({ authorId, slug: postSlug });

    const tagsForPost = await this.db
      .select({
        name: tags.name,
        slug: tags.slug,
      })
      .from(tags)
      .innerJoin(postTags, eq(tags.id, postTags.tagId))
      .where(eq(postTags.postId, post.id));

    return tagsForPost;
  }

  async removeTagFromPost(removeTagFromPostDto: RemoveTagFromPostDtoType) {
    const { authorId, postSlug, tagSlug } = removeTagFromPostDto;

    const [tag] = await this.db
      .select({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
      })
      .from(tags)
      .where(eq(tags.slug, tagSlug));

    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    const post = await this.postsService.findPost({ authorId, slug: postSlug });

    await this.db
      .delete(postTags)
      .where(and(eq(postTags.postId, post.id), eq(postTags.tagId, tag.id)));

    return;
  }
}
