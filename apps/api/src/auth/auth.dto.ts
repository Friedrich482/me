import { RegisterUserDto, SignInUserDto } from "src/common/dto";
import { z } from "zod";

export type SignInUserDtoType = z.infer<typeof SignInUserDto>;

export type RegisterUserDtoType = z.infer<typeof RegisterUserDto>;
