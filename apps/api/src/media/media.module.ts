import { CloudflareModule } from "@/cloudflare/cloudflare.module";
import { DrizzleModule } from "@/drizzle/drizzle.module";
import { Module } from "@nestjs/common";

import { MediaRouter } from "./media.router";
import { MediaService } from "./media.service";

@Module({
  imports: [DrizzleModule, CloudflareModule],
  providers: [MediaService, MediaRouter],
  exports: [MediaService, MediaRouter],
})
export class MediaModule {}
