import { Global, Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/env/env.service';

@Global()
@Module({
  providers: [TrpcService, TrpcRouter, JwtService, EnvService],
  exports: [TrpcService],
})
export class TrpcModule {}
