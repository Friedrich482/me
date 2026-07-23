import { AuthModule } from "@/auth/auth.module";
import { MediaModule } from "@/media/media.module";
import { PostsModule } from "@/posts/posts.module";
import { TagsModule } from "@/tags/tags.module";
import { Module } from "@nestjs/common";

import { AppRouterRouter } from "./app-router.router";
import { appRouterProvider } from "./providers/app-router.provider";

@Module({
  imports: [AuthModule, TagsModule, MediaModule, PostsModule],
  providers: [appRouterProvider, AppRouterRouter],
})
export class AppRouterModule {}
