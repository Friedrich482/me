import { RegisterUserDto, SignInUserDto } from "src/common/dto";
import { TrpcService } from "src/trpc/trpc.service";

import { Injectable } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authService: AuthService,
  ) {}
  private readonly AUTH_COOKIE_NAME = "auth_token";
  private readonly COOKIE_MAX_AGE = 28 * 24 * 60 * 60 * 1000; // 28 days

  procedures = {
    auth: this.trpcService.trpc.router({
      signIn: this.trpcService
        .publicProcedure()
        .input(SignInUserDto)
        .mutation(async ({ input, ctx }) => {
          const token = await this.authService.signIn(input);

          // Set the HTTP-only cookie
          ctx.res.cookie(this.AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: this.COOKIE_MAX_AGE,
          });
        }),

      register: this.trpcService
        .publicProcedure()
        .input(RegisterUserDto)
        .mutation(async ({ input, ctx }) => {
          const token = await this.authService.register(input);

          // Set the HTTP-only cookie
          ctx.res.cookie(this.AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: this.COOKIE_MAX_AGE,
          });
        }),
    }),
  };
}
