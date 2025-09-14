import { TrpcService } from "src/trpc/trpc.service";

import { Injectable } from "@nestjs/common";

import { DeleteFileFromBucketDto, GetUploadUrlDto } from "./cloudflare.dto";
import { CloudflareService } from "./cloudflare.service";

@Injectable()
export class CloudflareRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly cloudflareService: CloudflareService,
  ) {}

  procedures = {
    cloudflare: this.trpcService.trpc.router({
      getUploadUrl: this.trpcService
        .protectedProcedure()
        .input(GetUploadUrlDto)
        .mutation(async ({ input }) =>
          this.cloudflareService.getUploadUrl(input),
        ),

      deleteFileFromBucket: this.trpcService
        .protectedProcedure()
        .input(DeleteFileFromBucketDto)
        .mutation(async ({ input }) =>
          this.cloudflareService.deleteFileFromBucket(input),
        ),
    }),
  };
}
