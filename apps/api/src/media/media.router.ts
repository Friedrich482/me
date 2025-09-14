import { TrpcService } from "src/trpc/trpc.service";

import { Injectable } from "@nestjs/common";

import { CreateMediaDto, DeleteMediaDto, UpdateMediaDto } from "./media.dto";
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

      update: this.trpcService
        .protectedProcedure()
        .input(UpdateMediaDto)
        .mutation(async ({ ctx, input }) =>
          this.mediaService.update({ ...input, authorId: ctx.user.sub }),
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
