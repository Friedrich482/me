import { Injectable } from "@nestjs/common";
import { TrpcService } from "src/trpc/trpc.service";

import {
  CreatePostDto,
  DeletePostDto,
  FindAllPostsDto,
  FindPostDto,
  UpdatePostDto,
} from "./posts.dto";
import { PostsService } from "./posts.service";

@Injectable()
export class PostsRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly postsService: PostsService,
  ) {}

  procedures = {
    posts: this.trpcService.trpc.router({
      create: this.trpcService
        .protectedProcedure()
        .input(CreatePostDto)
        .mutation(async ({ ctx, input }) =>
          this.postsService.create({
            ...input,
            authorId: ctx.user.sub,
          }),
        ),

      findAll: this.trpcService
        .protectedProcedure()
        .input(FindAllPostsDto)
        .query(async ({ ctx, input }) =>
          this.postsService.findAll({
            status: input.status,
            authorId: ctx.user.sub,
          }),
        ),
      findPost: this.trpcService
        .protectedProcedure()
        .input(FindPostDto)
        .query(async ({ ctx, input }) =>
          this.postsService.findPost({ ...input, authorId: ctx.user.sub }),
        ),

      update: this.trpcService
        .protectedProcedure()
        .input(UpdatePostDto)
        .mutation(async ({ ctx, input }) =>
          this.postsService.update({
            ...input,
            authorId: ctx.user.sub,
          }),
        ),

      deletePost: this.trpcService
        .protectedProcedure()
        .input(DeletePostDto)
        .mutation(async ({ ctx, input }) =>
          this.postsService.deletePost({
            ...input,
            authorId: ctx.user.sub,
          }),
        ),
    }),
  };
}
