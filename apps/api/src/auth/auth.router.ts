import { Injectable } from "@nestjs/common";
import { RegisterUserDto, SignInUserDto } from "src/common/dto";
import { TrpcService } from "src/trpc/trpc.service";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authService: AuthService,
  ) {}
  procedures = {
    auth: this.trpcService.trpc.router({
      signInUser: this.trpcService
        .publicProcedure()
        .input(SignInUserDto)
        .mutation(async ({ input, ctx }) =>
          this.authService.signIn(input, ctx.res),
        ),

      registerUser: this.trpcService
        .publicProcedure()
        .input(RegisterUserDto)
        .mutation(async ({ input, ctx }) =>
          this.authService.register(input, ctx.res),
        ),
    }),
  };
}
