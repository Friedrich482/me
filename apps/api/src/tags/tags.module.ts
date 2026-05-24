import { DrizzleModule } from "@/drizzle/drizzle.module";
import { PostsService } from "@/posts/posts.service";
import { Module } from "@nestjs/common";

import { TagsService } from "./tags.service";

@Module({
  imports: [DrizzleModule],
  providers: [TagsService, PostsService],
  exports: [TagsService],
})
export class TagsModule {}
