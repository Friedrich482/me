import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TRPCError } from "@trpc/server";
import { compare } from "bcrypt";
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
}
