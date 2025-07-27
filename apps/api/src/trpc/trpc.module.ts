import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EnvService } from "src/env/env.service";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
  providers: [TrpcService, TrpcRouter, JwtService, EnvService],
  exports: [TrpcService],
})
export class TrpcModule {}
