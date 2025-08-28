import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { AuthRouter } from "src/auth/auth.router";
import { EnvService } from "src/env/env.service";

import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
  imports: [AuthModule],
  providers: [TrpcService, TrpcRouter, JwtService, EnvService, AuthRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
