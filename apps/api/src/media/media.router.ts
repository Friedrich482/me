import { TrpcService } from "src/trpc/trpc.service";

import { Injectable } from "@nestjs/common";

import {
  AttachMediaToPostDto,
  CreateMediaDto,
  DeleteMediaDto,
  FindAllMediaDto,
} from "./media.dto";
import { MediaService } from "./media.service";

@Injectable()
export class MediaRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly mediaService: MediaService,
  ) {}

  procedures = {
    media: this.trpcService.trpc.router({
      create: this.trpcService
        .protectedProcedure()
        .input(CreateMediaDto)
        .mutation(async ({ input }) => this.mediaService.create({ ...input })),

      findAll: this.trpcService
        .protectedProcedure()
        .input(FindAllMediaDto)
        .query(async ({ ctx, input }) =>
          this.mediaService.findAll({ ...input, authorId: ctx.user.sub }),
        ),

      attachMediaToPost: this.trpcService
        .protectedProcedure()
        .input(AttachMediaToPostDto)
        .mutation(async ({ ctx, input }) =>
          this.mediaService.attachMediaToPost({
            ...input,
            authorId: ctx.user.sub,
          }),
        ),

      delete: this.trpcService
        .protectedProcedure()
        .input(DeleteMediaDto)
        .mutation(async ({ ctx, input }) =>
          this.mediaService.delete({ ...input, authorId: ctx.user.sub }),
        ),
    }),
  };
}
