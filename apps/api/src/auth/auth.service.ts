import { compare } from "bcrypt";
import { JWTDtoType } from "src/common/dto";
import { EnvService } from "src/env/env.service";
import { TrpcContext } from "src/trpc/trpc.service";
import { UsersService } from "src/users/users.service";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  RegisterUserDtoType,
  SignInUserDtoType,
} from "@repo/common/types-schemas";
import { TRPCError } from "@trpc/server";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}

  async signIn(signInDto: SignInUserDtoType) {
    const { password: pass, email } = signInDto;

    const user = await this.usersService.findByEmail({ email });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isPasswordCorrect = await compare(pass, user.password);
    if (!isPasswordCorrect) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect password",
      });
    }

    const payload: Pick<JWTDtoType, "sub"> = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async register(registerDto: RegisterUserDtoType) {
    const { email, password } = registerDto;
    const createdUser = await this.usersService.create({
      email,
      password,
    });

    const payload: Pick<JWTDtoType, "sub"> = { sub: createdUser.id };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async checkAuthStatus(ctx: TrpcContext) {
    return {
      isAuthenticated: true,
      user: ctx.user,
    };
  }

  async getUser(ctx: TrpcContext) {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not found",
      });
    }

    const { sub } = ctx.user;
    const { email, id } = await this.usersService.findOne({
      id: sub,
    });

    return {
      email,
      id,
    };
  }
}
