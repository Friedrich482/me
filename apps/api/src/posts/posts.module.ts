import { Module } from "@nestjs/common";

import { DrizzleModule } from "../drizzle/drizzle.module";
import { PostsRouter } from "./posts.router";
import { PostsService } from "./posts.service";

@Module({
  imports: [DrizzleModule],
  providers: [PostsService, PostsRouter],
  exports: [PostsService, PostsRouter],
})
export class PostsModule {}
