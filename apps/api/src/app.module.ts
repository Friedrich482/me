import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { envSchema } from "./env";
import { EnvModule } from "./env/env.module";
import { EnvService } from "./env/env.service";
import { TrpcModule } from "./trpc/trpc.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    TrpcModule,
    EnvModule,
    DrizzleModule,
    AuthModule,
    UsersModule,
    PostsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvService],
})
export class AppModule {}
