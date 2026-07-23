import { EnvModule } from "@/env/env.module";
import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { trpcProvider } from "./providers/trpc.provider";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
  imports: [JwtModule, EnvModule],
  providers: [TrpcService, trpcProvider],
  exports: [TrpcService],
})
export class TrpcModule {}
