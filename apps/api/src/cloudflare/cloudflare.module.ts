import { EnvModule } from "@/env/env.module";
import { Module } from "@nestjs/common";

import { CloudflareService } from "./cloudflare.service";
import { r2Provider } from "./providers/r2.provider";

@Module({
  imports: [EnvModule],
  providers: [CloudflareService, r2Provider],
  exports: [CloudflareService],
})
export class CloudflareModule {}
