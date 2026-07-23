import { DrizzleModule } from "@/drizzle/drizzle.module";
import { PostsModule } from "@/posts/posts.module";
import { Module } from "@nestjs/common";

import { TagsRouter } from "./tags.router";
import { TagsService } from "./tags.service";

@Module({
  imports: [DrizzleModule, PostsModule],
  providers: [TagsService, TagsRouter],
  exports: [TagsService, TagsRouter],
})
export class TagsModule {}
