import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TRPCError } from "@trpc/server";
import { compare } from "bcrypt";
import { Response } from "express";
import { JWTDtoType } from "src/common/dto";
import { EnvService } from "src/env/env.service";
import { UsersService } from "src/users/users.service";

import { RegisterUserDtoType, SignInUserDtoType } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}
  private readonly AUTH_COOKIE_NAME = "auth_token";
  private readonly COOKIE_MAX_AGE = 28 * 24 * 60 * 60 * 1000; // 28 days

  async signIn(signInDto: SignInUserDtoType, response: Response) {
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

    // Set the HTTP-only cookie
    response.cookie(this.AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: this.COOKIE_MAX_AGE,
    });
  }

  async register(registerDto: RegisterUserDtoType, response: Response) {
    const { email, password } = registerDto;
    const createdUser = await this.usersService.create({
      email,
      password,
    });

    const payload: Pick<JWTDtoType, "sub"> = { sub: createdUser.id };
    const token = await this.jwtService.signAsync(payload);

    // Set the HTTP-only cookie
    response.cookie(this.AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: this.COOKIE_MAX_AGE,
    });

    return {
      access_token: token,
    };
  }
}
