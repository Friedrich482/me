import { Module } from "@nestjs/common";

import { DrizzleModule } from "../drizzle/drizzle.module";

import { PostsService } from "./posts.service";

@Module({
  imports: [DrizzleModule],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
