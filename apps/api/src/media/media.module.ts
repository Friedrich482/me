import { CloudflareService } from "@/cloudflare/cloudflare.service";
import { DrizzleModule } from "@/drizzle/drizzle.module";
import { EnvService } from "@/env/env.service";
import { Module } from "@nestjs/common";

import { MediaService } from "./media.service";

@Module({
  imports: [DrizzleModule],
  providers: [MediaService, CloudflareService, EnvService],
  exports: [MediaService],
})
export class MediaModule {}
