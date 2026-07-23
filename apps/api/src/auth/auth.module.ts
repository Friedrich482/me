import { EnvModule } from "@/env/env.module";
import { EnvService } from "@/env/env.service";
import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthRouter } from "./auth.router";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        global: true,
        secret: envService.get("JWT_SECRET"),
        signOptions: { expiresIn: "28d" },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [AuthService, AuthRouter],
  exports: [AuthService, AuthRouter],
})
export class AuthModule {}
