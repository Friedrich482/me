import { AuthModule } from "@/auth/auth.module";
import { AuthRouter } from "@/auth/auth.router";
import { EnvService } from "@/env/env.service";
import { MediaModule } from "@/media/media.module";
import { MediaRouter } from "@/media/media.router";
import { PostsModule } from "@/posts/posts.module";
import { PostsRouter } from "@/posts/posts.router";
import { TagsModule } from "@/tags/tags.module";
import { TagsRouter } from "@/tags/tags.router";
import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
  imports: [AuthModule, PostsModule, TagsModule, MediaModule],
  providers: [
    TrpcService,
    TrpcRouter,
    JwtService,
    EnvService,
    AuthRouter,
    PostsRouter,
    TagsRouter,
    MediaRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
