import { Module } from "@nestjs/common";
import { EnvService } from "src/env/env.service";

import { DrizzleAsyncProvider, drizzleProvider } from "./drizzle.provider";

@Module({
  providers: [...drizzleProvider, EnvService],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
