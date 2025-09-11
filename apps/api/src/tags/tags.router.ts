import { TrpcService } from "src/trpc/trpc.service";

import { Injectable } from "@nestjs/common";
import { AddTagToPostDto } from "@repo/common/types-schemas";

import {
  FindAllTagsForPostDto,
  FindAllTagsForPublishedPostDto,
  RemoveTagFromPostDto,
} from "./tags.dto";
import { TagsService } from "./tags.service";

@Injectable()
export class TagsRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly tagsService: TagsService,
  ) {}

  procedures = {
    tags: this.trpcService.trpc.router({
      addTagToPost: this.trpcService
        .protectedProcedure()
        .input(AddTagToPostDto)
        .mutation(async ({ input }) =>
          this.tagsService.addTagToPost({ ...input }),
        ),

      findAllTagsForPost: this.trpcService
        .protectedProcedure()
        .input(FindAllTagsForPostDto)
        .query(async ({ ctx, input }) =>
          this.tagsService.findAllTagsForPost({
            ...input,
            authorId: ctx.user.sub,
          }),
        ),

      findAllTagsForPublishedPost: this.trpcService
        .publicProcedure()
        .input(FindAllTagsForPublishedPostDto)
        .query(async ({ input }) =>
          this.tagsService.findAllTagsForPublishedPost({ ...input }),
        ),

      removeTagFromPost: this.trpcService
        .protectedProcedure()
        .input(RemoveTagFromPostDto)
        .mutation(async ({ ctx, input }) =>
          this.tagsService.removeTagFromPost({
            ...input,
            authorId: ctx.user.sub,
          }),
        ),
    }),
  };
}
