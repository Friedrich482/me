import { CloudflareService } from "src/cloudflare/cloudflare.service";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { EnvService } from "src/env/env.service";

import { Module } from "@nestjs/common";

import { MediaService } from "./media.service";

@Module({
  imports: [DrizzleModule],
  providers: [MediaService, CloudflareService, EnvService],
  exports: [MediaService],
})
export class MediaModule {}
