import { AuthModule } from "src/auth/auth.module";
import { AuthRouter } from "src/auth/auth.router";
import { CloudflareModule } from "src/cloudflare/cloudflare.module";
import { CloudflareRouter } from "src/cloudflare/cloudflare.router";
import { EnvService } from "src/env/env.service";
import { PostsModule } from "src/posts/posts.module";
import { PostsRouter } from "src/posts/posts.router";
import { TagsModule } from "src/tags/tags.module";
import { TagsRouter } from "src/tags/tags.router";

import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
  imports: [AuthModule, PostsModule, TagsModule, CloudflareModule],
  providers: [
    TrpcService,
    TrpcRouter,
    JwtService,
    EnvService,
    AuthRouter,
    PostsRouter,
    TagsRouter,
    CloudflareRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
