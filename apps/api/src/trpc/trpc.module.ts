import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { AuthRouter } from "src/auth/auth.router";
import { EnvService } from "src/env/env.service";
import { PostsModule } from "src/posts/posts.module";
import { PostsRouter } from "src/posts/posts.router";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
  imports: [AuthModule, PostsModule],
  providers: [
    TrpcService,
    TrpcRouter,
    JwtService,
    EnvService,
    AuthRouter,
    PostsRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
